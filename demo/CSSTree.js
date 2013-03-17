/*
 * CSSTree 0.0.1
 * Corey Hart @ http://www.codenothing.com
 * MIT License http://www.codenothing.com/license
 */
(function( global, undefined ) {

var rnewlineseek = /(\r\n|\r|\n)/g,
	rwhitespace = /(\s|\t|\r\n|\r|\n)/;


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
			peek = '';

		nested = nested || false;
		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// End of comment
			if ( self.c == '*' && peek == '/' ) {
				return self.branches.push(
					new CSSTree.Comment( comment + '*/', nested, position.markEnd( ++self.i + 1 ) )
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
			parts = [], nested = null, part = '',
			peek, branch;

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
				return self.branches.push(
					new CSSTree.AtRule( selector, position.markEnd( self.i ) )
				);
			}
			// Media atrule
			else if ( self.c == '{' && selector.trim()[ 0 ] == '@' ) {
				branch = self.nested( selector.trim(), position );
				branch.position = position.markEnd( self.i );
				return self.branches.push( branch );
			}
			// Selector for ruleset
			else if ( self.c == '{' ) {
				branch = new CSSTree.Selector( selector, self.rules( position ), position );
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
		if ( ( selector = selector.trim() ).length ) {
			return self.branches.push(
				new CSSTree.AtRule( selector, position.markEnd( self.i ) )
			);
		}
	},

	// Rule Sets
	rules: function( parentPos ) {
		var self = this, rules = [], peek, prop, position;

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
				prop = new CSSTree.PropertyValue(
					self.property( position ).trim(),
					self.value( position ).trim(),
					position
				);

				// Break down the parts of the value, and push it
				position.markEnd( self.i, false );

				// Only add if there is an actual property
				if ( prop.property.length ) {
					rules.push( prop );
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
			peek, index, prop, subPosition,
			block = atrule.trim()[ 0 ] == '@' ?
				new CSSTree.AtRule( atrule, position ) :
				new CSSTree.Selector( atrule, null, position );

		for ( ; ++self.i < self.length; ) {
			self.c = self.css[ self.i ];
			peek = self.css[ self.i + 1 ];

			// Escaped string
			if ( self.c == '\\' ) {
				string += self.c + self.css[ ++self.i ];
			}
			// Comment
			if ( self.c == '/' && peek == '*' ) {
				position.markChunkEnd( self.i-- );
				self.comment( true );
				position.markChunkStart( self.i + 1 );
			}
			// End of property:value
			else if ( self.c == ';' ) {
				subPosition = new CSSTree.Position( self.i - string.length );
				subPosition.markEnd( self.i );

				// String trimming & positioning
				string = string.trim();
				index = string.indexOf( ':' );

				// Build up rule property
				prop = new CSSTree.PropertyValue(
					string.substr( 0, index ).trim(),
					string.substr( index + 1 ).trim(),
					subPosition
				);

				// Atrules don't startoff with rules
				if ( ! block.rules ) {
					block.rules = [];
				}

				// Parse out parts and add to branches rules
				block.rules.push( prop );
				string = '';
			}
			// Nested Block
			else if ( self.c == '{' ) {
				if ( ! block.branches ) {
					block.branches = [];
				}

				subPosition = new CSSTree.Position( self.i - string.length, position );
				block.branches.push( self.nested( string.trim(), subPosition ) );
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
					prop = new CSSTree.PropertyValue(
						string.substr( 0, index ).trim(),
						string.substr( index + 1 ).trim(),
						subPosition.markEnd( self.i )
					);

					// Atrules don't startoff with rules
					if ( ! block.rules ) {
						block.rules = [];
					}

					// Parse out value parts and add to rules
					block.rules.push( prop );
				}

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
		var self = this, line = self._newlines.length, chracter = 0;

		while ( line-- ) {
			if ( pos > self._newlines[ line ] ) {
				chracter = self._newlines[ line ] + 1;
				break;
			}
		}
		
		return {
			line: line + 2,
			character: ( pos + 1 ) - chracter
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


})( this );

(function( global, undefined ) {

function Position( start, _parent ) {
	var self = this;

	if ( ! ( self instanceof Position ) ) {
		return new Position( start, _parent );
	}

	if ( _parent && _parent instanceof Position ) {
		self._parent = _parent;
	}

	if ( start === undefined ) {
		start = 0;
	}

	self.range = { start: start, end: start, length: 0 };
	self.start = { line: 0, character: 0 };
	self.end = { line: 0, character: 0 };
	self.chunks = [];
	self.markChunkStart( start, false );
}

Position.prototype = {

	markEnd: function( pos, propogate ) {
		var self = this;

		self.markChunkEnd( pos, propogate );
		self.range.end = pos;
		self.range.length = pos - self.range.start;

		if ( self._parent ) {
			delete self._parent;
		}

		return self;
	},

	markChunkEnd: function( pos, propogate ) {
		var self = this;

		if ( self._chunk ) {
			self._chunk.end = pos;
			self._chunk.length = pos - self._chunk.start;
			delete self._chunk;
		}

		if ( self._parent && propogate !== false ) {
			self._parent.markChunkEnd( pos, propogate );
		}

		return self;
	},

	markChunkStart: function( pos, propogate ) {
		var self = this;

		self._chunk = { start: pos, end: pos, length: 0 };
		self.chunks.push( self._chunk );

		if ( self._parent && propogate !== false ) {
			self._parent.markChunkStart( pos, propogate );
		}
	}

};

CSSTree.Position = Position;


})( this );

(function( global, undefined ) {

function Comment( comment, nested, position ) {
	var self = this;

	if ( ! ( self instanceof Comment ) ) {
		return new Comment( comment, nested, position );
	}

	self.comment = ( comment || '' ).trim();
	self.nested = !!nested;
	self.position = position;
}

CSSTree.Comment = Comment;


})( this );

(function( global, undefined ) {

var ratruleseek = /"|'|\(/,
	ratrulepart = /[\, ]/;


function AtRule( atrule, position ) {
	var self = this;

	if ( ! ( self instanceof AtRule ) ) {
		return new AtRule( atrule, position );
	}

	self.atrule = ( atrule || '' ).trim();
	self.position = position;
	self.parts = [];
	self.generateParts();
}

AtRule.prototype = {
	
	generateParts: function(){
		var self = this, atrule = self.atrule,
			parts = [], part = '',
			i = -1, l = atrule.length, c = '';

		for ( ; ++i < l; ) {
			c = atrule[ i ];

			// Part separator
			if ( ratrulepart.exec( c ) ) {
				part = part.trim();

				if ( part.length ) {
					parts.push( part );
				}

				if ( c != ' ' ) {
					parts.push( c );
				}

				part = '';
			}
			// Read all characters in a seek sequence ((...), "...", '...', etc)
			else if ( ratruleseek.exec( c ) ) {
				part += c;
				seek = c == '(' ? ')' : c;

				// Find end char
				for ( ; ++i < l; ) {
					c = atrule[ i ];
					part += c;

					// End char found, break off and attach part
					if ( c == seek ) {
						break;
					}
					// Skip over escaped values
					else if ( c == "\\" && atrule[ i + 1 ] ) {
						part += atrule[ ++i ];
					}
				}
			}
			// Add to the current part
			else {
				part += c;
			}
		}

		// Catch the last part and add it
		if ( ( part = part.trim() ).length ) {
			parts.push( part );
		}

		self.parts = parts;
	},

	generateAtrule: function(){
		var self = this;
	}

};

CSSTree.AtRule = AtRule;


})( this );

(function( global, undefined ) {

var rwhitespace = /(\s|\t|\r\n|\r|\n)/,
	rvalueseparator = /\/|,/,
	rvalueseek = /"|'|\(/;


function PropertyValue( property, value, position ) {
	var self = this;

	if ( ! ( self instanceof PropertyValue ) ) {
		return new PropertyValue( property, value, position );
	}

	self.property = ( property || '' ).trim();
	self.value = ( value || '' ).trim();
	self.position = position;
	self.parts = [];
	self.generateParts();
}

PropertyValue.prototype = {

	generateParts: function(){
		var self = this, value = self.value,
			parts = [], i = -1, l = value.length, part = '', c, seek;

		for ( ; ++i < l; ) {
			c = value[ i ];

			// Whitespace is a value separator
			if ( rwhitespace.exec( c ) ) {
				if ( ( part = part.trim() ).length ) {
					parts.push( part );
				}

				part = '';
			}
			// Value separator
			else if ( rvalueseparator.exec( c ) ) {
				if ( ( part = part.trim() ).length ) {
					parts.push( part );
				}

				parts.push( c );
				part = '';
			}
			// Read all characters in a seek sequence (url(...), "...", '...', etc)
			else if ( rvalueseek.exec( c ) ) {
				part += c;
				seek = c == '(' ? ')' : c;

				// Find end char
				for ( ; ++i < l; ) {
					c = value[ i ];
					part += c;

					// End char found, break off and attach part
					if ( c == seek ) {
						break;
					}
					// Skip over escaped values
					else if ( c == "\\" && value[ i + 1 ] ) {
						part += value[ ++i ];
					}
				}

				parts.push( part );
				part = '';
			}
			else {
				part += c;
			}
		}

		// Attach final leftover part
		if ( part.length ) {
			parts.push( part );
		}

		self.parts = parts;
	},

	generateValue: function(){
	}

};

CSSTree.PropertyValue = PropertyValue;


})( this );

(function( global, undefined ) {

var rselectornested = /[:#\[\.]/,
	rselectorpart = /[>~\+\*\,]/,
	rwhitespace = /(\s|\t|\r\n|\r|\n)/;


function Selector( selector, rules, position ) {
	var self = this;

	if ( ! ( self instanceof Selector ) ) {
		return new Selector( selector, rules, position );
	}

	self.selector = ( selector || '' ).trim();
	self.position = position;
	self.parts = [];
	self.rules = rules || [];
	self.generateParts();
}

Selector.prototype = {

	generateParts: function(){
		var self = this, selector = self.selector,
			parts = [], nested = null, part = '',
			i = -1, l = selector.length, c = '',
			innerSeek = null;

		for ( ; ++i < l; ) {
			c = selector[ i ];

			// Selector breaker (whitespace, comma, etc...)
			if ( rselectorpart.exec( c ) || rwhitespace.exec( c ) ) {
				part = part.trim();

				if ( nested !== null ) {
					if ( part.length ) {
						nested.push( part );
					}

					parts.push( nested );
				}
				else if ( part.length ) {
					parts.push( part );
				}

				if ( ! rwhitespace.exec( c ) ) {
					parts.push( c );
				}

				nested = null;
				part = '';
			}
			// Inside selector, but still need to break apart ('span.class')
			else if ( part.length && rselectornested.exec( c ) ) {
				part = part.trim();

				// Catch whitespace parts and just continue on
				if ( ! part.length ) {
					part = c;
					continue;
				}

				// Add part to nested array
				if ( nested === null ) {
					nested = [ part ];
				}
				else {
					nested.push( part );
				}

				// Create new part
				part = c;

				// Seek to closing brace
				if ( c == '[' ) {
					for ( ; ++i < l; ) {
						c = selector[ i ];
						part += c;

						if ( c == "\\" ) {
							part += selector[ ++i ];
						}
						else if ( innerSeek !== null ) {
							if ( c == innerSeek ) {
								innerSeek = null;
							}
						}
						else if ( c == '"' || c == "'" ) {
							innerSeek = c;
						}
						else if ( c == ']' ) {
							nested.push( part );
							part = '';
							break;
						}
					}
				}
			}
			else {
				part += c;
			}
		}

		// Catch the last part if it exists
		if ( ( part = part.trim() ).length ) {
			if ( nested !== null ) {
				if ( part.length ) {
					nested.push( part );
				}

				parts.push( nested );
			}
			else {
				parts.push( part );
			}
		}

		// Apply parts back to object
		self.parts = parts;
	},

	generateSelector: function(){
		var self = this;
	}

};

CSSTree.Selector = Selector;


})( this );