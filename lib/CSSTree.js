var rnewlineseek = /(\r\n|\r|\n)/g,
	rwhitespace = /(\s|\t|\r\n|\r|\n)/,
	leftTrim = /^(\r\n|\r|\n|\t|\s)*/,
	StringIterator = global.StringIterator;


function CSSTree( css ) {
	var self = this, m;

	// Force instance of CSSTree
	if ( ! ( self instanceof CSSTree ) ) {
		return new CSSTree( css );
	}

	// Internals
	self.iter = new StringIterator( css );
	self.css = css;
	self.branches = [];

	// Positional setup
	self._newlines = [];
	while ( ( m = rnewlineseek.exec( self.css ) ) ) {
		self._newlines.push( rnewlineseek.lastIndex - 1 );
	}

	// Begin rendering
	self.render();
	self._positions( self.branches );
}

// Methods
CSSTree.prototype = {

	// Starts process of reading the stylesheet
	render: function(){
		var self = this,
			iter = self.iter;

		iter.each(function( c ) {
			// Comment
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				self.comment();
			}
			// Skip over whitespace, but assume anything else is a selector/atrule
			else if ( ! rwhitespace.exec( c ) ) {
				iter.reverse();
				self.selector();
			}
		});
	},

	// Ignore comment blocks
	comment: function( nested ) {
		var self = this,
			iter = self.iter,
			position = new CSSTree.Position( iter.index + 1 ),
			comment = iter.each(function( c, iter ) {
				if ( iter.c == '/' && iter.prev == '*' ) {
					return false;
				}
			});

		self.branches.push(
			new CSSTree.Comment( comment, nested || false, position.markEnd( iter.index + 1 ) )
		);
	},

	// Selctor looks for opening rule set or closing semicolon for oneliners
	selector: function(){
		var self = this,
			iter = self.iter,
			position = new CSSTree.Position( iter.index + 1 ),
			selector = '',
			branch;

		iter.each(function( c ) {
			// Comment block
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				position.markChunkEnd( iter.index );
				self.comment();
				position.markChunkStart( iter.index + 1 );
			}
			// Atrule
			else if ( c == ';' ) {
				return false;
			}
			// Media atrule
			else if ( c == '{' && selector.trim()[ 0 ] == '@' ) {
				branch = self.nested( selector, position );
				branch.position = position.markEnd( iter.index + 1 );
				self.branches.push( branch );

				selector = null;
				return false;
			}
			// Selector for ruleset
			else if ( c == '{' ) {
				branch = new CSSTree.Selector( selector, self.rules( position ), position );
				position.markEnd( iter.index + 1 );
				self.branches.push( branch );

				selector = null;
				return false;
			}
			// Escape string
			else if ( c == "\\" ) {
				iter.skip();
				selector += c + iter.c;
			}
			// Seek
			else if ( c == "'" || c == '"' ) {
				selector += c + iter.seek( c );
			}
			// Seek
			else if ( c == '(' ) {
				selector += c + iter.seek( ')' );
			}
			// Add to selector string
			else {
				selector += c;
			}
		});

		// Single line queries
		if ( selector && selector.trim().length ) {
			self.branches.push(
				new CSSTree.AtRule( selector, position.markEnd( iter.index ) )
			);
		}
	},

	// Rule Sets
	rules: function( parentPos ) {
		var self = this,
			iter = self.iter,
			rules = [],
			rule, position;

		iter.each(function( c ) {
			// Nested Comment block
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				parentPos.markChunkEnd( iter.index + 1 );
				self.comment( true );
				parentPos.markChunkStart( iter.index + 1 );
			}
			// End of rules
			else if ( c == '}' ) {
				return false;
			}
			// New rule
			else if ( ! rwhitespace.exec( c ) ) {
				position = new CSSTree.Position( iter.index, parentPos );
				iter.reverse();

				rule = new CSSTree.Rule(
					self.property( position ).trim(),
					self.value( position ).trim(),
					position
				);

				// Break down the parts of the value, and push it
				position.markEnd( iter.index + ( iter.next == '}' ? 1 : 0 ), false );

				// Only add if there is an actual property
				if ( rule.property.length ) {
					rules.push( rule );
				}
			}
		});

		return rules;
	},

	// Property Names
	property: function( position ) {
		var self = this,
			iter = self.iter,
			property = '';

		iter.each(function( c ) {
			// Nested Comment block
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				position.markChunkEnd( iter.index );
				self.comment( true );
				position.markChunkStart( iter.index + 1 );
			}
			// End of property
			else if ( c == ':' ) {
				return false;
			}
			// Invalid CSS, but still end of property
			else if ( c == ';' || c == '}' ) {
				iter.reverse();
				return false;
			}
			else {
				property += c;
			}
		});

		return property;
	},

	// Values
	value: function( position ) {
		var self = this,
			iter = self.iter,
			value = '';

		iter.each(function( c ) {
			// Nested Comment block
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				position.markChunkEnd( iter.index );
				self.comment( true );
				position.markChunkStart( iter.index + 1 );
			}
			// End of value
			else if ( c == ';' ) {
				return false;
			}
			// Watch for no semi-colon at end of set
			else if ( c == '}' ) {
				iter.reverse();
				return false;
			}
			// Seek strings
			else if ( c == "'" || c == '"' ) {
				value += c + iter.seek( c );
			}
			// Seek groupings
			else if ( c == '(' ) {
				value += c + iter.seek( ')' );
			}
			// Append
			else {
				value += c;
			}
		});

		return value;
	},

	// Nested atrules
	nested: function( atrule, position ) {
		var self = this,
			iter = self.iter,
			string = '',
			peek, index, rule, subPosition, character,
			block = atrule.trim()[ 0 ] == '@' ?
				new CSSTree.AtRule( atrule, position ) :
				new CSSTree.Selector( atrule, null, position );

		iter.each(function( c ) {
			// Nested Comment block
			if ( c == '/' && iter.next == '*' ) {
				iter.reverse();
				position.markChunkEnd( iter.index );
				self.comment( true );
				position.markChunkStart( iter.index );
			}
			// End of property:value
			else if ( c == ';' ) {
				subPosition = new CSSTree.Position( iter.index - string.trim().length );
				subPosition.markEnd( iter.index );

				// String trimming & positioning
				string = string.trim();
				index = string.indexOf( ':' );

				// Build up rule property
				rule = new CSSTree.Rule(
					string.substr( 0, index ).trim(),
					string.substr( index + 1 ).trim(),
					subPosition
				);

				// Atrules don't startoff with rules
				if ( ! block.rules ) {
					block.rules = [];
				}

				// Parse out parts and add to branches rules
				block.rules.push( rule );
				string = '';
			}
			// Nested Block
			else if ( c == '{' ) {
				if ( ! block.branches ) {
					block.branches = [];
				}

				// Nested branches should start tracking at the first character, not whitespace
				string = string.replace( leftTrim, '' );

				// Travel down the tree
				subPosition = new CSSTree.Position( iter.index - string.length, position );
				block.branches.push( self.nested( string, subPosition ) );
				string = '';
			}
			// Seek
			else if ( c == "'" || c == '"' ) {
				string += c + iter.seek( c );
			}
			// Seek
			else if ( c == '(' ) {
				string += c + iter.seek( ')' );
			}
			// End of block
			else if ( c == '}' ) {
				subPosition = new CSSTree.Position( iter.index - string.length );

				// Assume any string left is a property:value definition
				if ( ( string = string.trim() ).length ) {
					index = string.indexOf( ':' );
					rule = new CSSTree.Rule(
						string.substr( 0, index ).trim(),
						string.substr( index + 1 ).trim(),
						subPosition.markEnd( iter.index )
					);

					// Atrules don't startoff with rules
					if ( ! block.rules ) {
						block.rules = [];
					}

					// Parse out value parts and add to rules
					block.rules.push( rule );
				}

				block.position.markEnd( iter.index + 1, false );
				return false;
			}
			// Append
			else {
				string += c;
			}
		});

		return block;
	},

	// Crawl the tree to finish position markup
	_positions: function( branches ) {
		var self = this;

		// Cycle through each branch for markings
		branches.forEach(function( branch ) {
			self._markPosition( branch.position );

			// Markup each rule positions
			if ( branch.rules ) {
				branch.rules.forEach(function( rule ) {
					if ( rule.position ) {
						self._markPosition( rule.position );
					}
				});
			}

			// Crawl nested branches
			if ( branch.branches ) {
				self._positions( branch.branches );
			}
		});
	},

	// Marks up position
	_markPosition: function( position ) {
		var self = this;

		// Mark branch positions
		position.start = self._charPosition( position.range.start );
		position.end = self._charPosition( position.range.end );
	},

	// Marks the line & character for the character position passed
	_charPosition: function( pos ) {
		var self = this, line = self._newlines.length, character = 0;

		while ( line-- ) {
			if ( pos > self._newlines[ line ] ) {
				character = self._newlines[ line ] + 1;
				break;
			}
		}
		
		return {
			line: line + 2,
			character: ( pos + 1 ) - character
		};
	}

};

// Keep Reference
CSSTree.StringIterator = StringIterator;

// Expose to NodeJS/Window
if ( typeof module == 'object' && typeof module.exports == 'object' ) {
	module.exports = CSSTree;
}
else {
	global.CSSTree = CSSTree;
}
