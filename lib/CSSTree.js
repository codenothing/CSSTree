var rnewlineseek = /(\r\n|\r|\n)/g,
	rwhitespace = /(\s|\t|\r\n|\r|\n)/,
	leftTrim = /^(\r\n|\r|\n|\t|\s)*/;


function CSSTree( css ) {
	var self = this, m;

	// Force instance of CSSTree
	if ( ! ( self instanceof CSSTree ) ) {
		return new CSSTree( css );
	}

	// Internals
	self.css = css || '';
	self.i = -1;
	self.length = self.css.length;
	self.branches = [];
	
	self._currentBranchStack = [ self ];

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
		var self = this, peek = '';

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Comment
			if ( self.c == '/' && peek == '*' ) {
				self.i--;
				self.comment();
			}
			// Skip over all whitespace
			else if ( rwhitespace.exec( self.c ) ) {
				continue;
			}
			// Assume anything else is a selector/atrule
			else {
				self.i--;
				self.selector();
			}
		}
	},

	// Ignore comment blocks
	comment: function( nested ) {
		var self = this,
			position = new CSSTree.Position( self.i + 1 ),
			comment = '',
			peek = '',
			branch = ( self._currentBranchStack || [] ).slice( -1 ).pop() || self;

		nested = nested || false;
		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// End of comment
			if ( self.c == '*' && peek == '/' ) {
				if (!branch.branches) {
					branch.branches = [];
				}
				
				return branch.branches.push(
					new CSSTree.Comment(
						comment + '*/', nested, position.markEnd( ++self.i + 1 ) 
					)
				);
			}
			else {
				comment += self.c;
			}
		}
	},

	// Selctor looks for opening rule set or closing semicolon for oneliners
	selector: function(){
		var self = this,
			position = new CSSTree.Position( self.i + 1 ),
			selector = '',
			character,
			parts = [], nested = null, part = '',
			peek, branch, newBranch;

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Comment block
			if ( self.c == '/' && peek == '*' ) {
				position.markChunkEnd( self.i-- );
				self.comment();
				position.markChunkStart( self.i + 1 );
			}
			// Atrule
			else if ( self.c == ';' ) {
				newBranch = new CSSTree.AtRule( selector, position.markEnd( self.i ) );
				self._currentBranchStack.push( newBranch );
				return self.branches.push( newBranch );
			}
			// Media atrule
			else if ( self.c == '{' && selector.trim()[ 0 ] == '@' ) {
				self._currentBranchStack.push( branch = self.nested( selector, position ) );
				branch.position = position.markEnd( self.i + 1 );
				return self.branches.push( branch );
			}
			// Selector for ruleset
			else if ( self.c == '{' ) {
				self._currentBranchStack.push(
					branch = new CSSTree.Selector( selector, self.rules( position ), position )
				);
				position.markEnd( self.i + 1 );
				return self.branches.push( branch );
			}
			// Escape string
			else if ( self.c == '\\' ) {
				selector += self.c + self.css[ ++self.i ];
			}
			// Seek
			else if ( self.c == "'" || self.c == '"' ) {
				character = self.c;
				selector += character + self.find( character ) + character;
			}
			// Seek
			else if ( self.c == '(' ) {
				selector += '(' + self.find( ')' ) + ')';
			}
			// Add to selector string
			else {
				selector += self.c;
			}
		}

		// Catch end of file queries without semi-colon
		if ( selector.trim().length ) {
			return self.branches.push(
				new CSSTree.AtRule( selector, position.markEnd( self.i ) )
			);
		}
	},

	// Rule Sets
	rules: function( parentPos ) {
		var self = this, rules = [], peek, rule, position;

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Comment
			if ( self.c == '/' && peek == '*' ) {
				parentPos.markChunkEnd( self.i-- );
				self.comment( true );
				parentPos.markChunkStart( self.i + 1 );
			}
			// End of rules
			else if ( self.c == '}' ) {
				return rules;
			}
			// New rule
			else if ( ! rwhitespace.exec( self.c ) ) {
				position = new CSSTree.Position( self.i, parentPos );
				self.i--;
				rule = new CSSTree.Rule(
					self.property( position ).trim(),
					self.value( position ).trim(),
					position
				);

				// Break down the parts of the value, and push it
				position.markEnd( self.i, false );

				// Only add if there is an actual property
				if ( rule.property.length ) {
					rules.push( rule );
				}
			}
		}

		return rules;
	},

	// Property Names
	property: function( position ) {
		var self = this, property = '', peek;

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Nested Comment
			if ( self.c == '/' && peek == '*' ) {
				position.markChunkEnd( self.i-- );
				self.comment( true );
				position.markChunkStart( self.i + 1 );
			}
			// End of property
			else if ( self.c == ':' ) {
				return property;
			}
			// Invalid CSS, but still end of property
			else if ( self.c == ';' || self.c == '}' ) {
				self.i--;
				return property;
			}
			else {
				property += self.c;
			}
		}

		return property;
	},

	// Values
	value: function( position ) {
		var self = this, value = '', character, peek;

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Comment
			if ( self.c == '/' && peek == '*' ) {
				position.markChunkEnd( self.i-- );
				self.comment( true );
				position.markChunkStart( self.i + 1 );
			}
			// End of value
			else if ( self.c == ';' ) {
				return value;
			}
			// Watch for no semi-colon at end of set
			else if ( self.c == '}' ) {
				self.i--;
				return value;
			}
			// Seek strings
			else if ( self.c == "'" || self.c == '"' ) {
				character = self.c;
				value += character + self.find( character ) + character;
			}
			// Seek groupings
			else if ( self.c == '(' ) {
				value += '(' + self.find( ')' ) + ')';
			}
			// Append
			else {
				value += self.c;
			}
		}

		return value;
	},

	// Parsing through escapable content
	find: function( endstring ) {
		var self = this, string = '';

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];

			// Escaped character
			if ( self.c == "\\" ) {
				string += self.c + self.css[ ++self.i ];
			}
			// Seek charactor hit
			else if ( self.c == endstring ) {
				return string;
			}
			// Append
			else {
				string += self.c;
			}
		}

		return string;
	},

	// Nested atrules
	nested: function( atrule, position ) {
		var self = this,
			string = '',
			peek, index, rule, subPosition, character,
			block = atrule.trim()[ 0 ] == '@' ?
				new CSSTree.AtRule( atrule, position ) :
				new CSSTree.Selector( atrule, null, position );
		
		self._currentBranchStack.push(block);

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Comment
			if ( self.c == '/' && peek == '*' ) {
				position.markChunkEnd( self.i-- );
				self.comment( true );
				position.markChunkStart( self.i + 1 );
			}
			// End of property:value
			else if ( self.c == ';' ) {
				subPosition = new CSSTree.Position( self.i - string.trim().length );
				subPosition.markEnd( self.i );

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
			else if ( self.c == '{' ) {
				if ( ! block.branches ) {
					block.branches = [];
				}

				// Nested branches should start tracking at the first character, not whitespace
				string = string.replace( leftTrim, '' );

				// Travel down the tree
				subPosition = new CSSTree.Position( self.i - string.length, position );
				block.branches.push( self.nested( string, subPosition ) );
				string = '';
			}
			// Seek
			else if ( self.c == "'" || self.c == '"' ) {
				character = self.c;
				string += character + self.find( character ) + character;
			}
			// Seek
			else if ( self.c == '(' ) {
				string += '(' + self.find( ')' ) + ')';
			}
			// End of block
			else if ( self.c == '}' ) {
				subPosition = new CSSTree.Position( self.i - string.length );

				// Assume any string left is a property:value definition
				if ( ( string = string.trim() ).length ) {
					index = string.indexOf( ':' );
					rule = new CSSTree.Rule(
						string.substr( 0, index ).trim(),
						string.substr( index + 1 ).trim(),
						subPosition.markEnd( self.i )
					);

					// Atrules don't startoff with rules
					if ( ! block.rules ) {
						block.rules = [];
					}

					// Parse out value parts and add to rules
					block.rules.push( rule );
				}
				
				self._currentBranchStack.pop();
				block.position.markEnd( self.i + 1, false );
				return block;
			}
			// Append
			else {
				string += self.c;
			}
		}

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


// Expose to NodeJS/Window
if ( typeof module == 'object' && typeof module.exports == 'object' ) {
	module.exports = CSSTree;
}
else {
	global.CSSTree = CSSTree;
}
