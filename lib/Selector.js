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
	self.breakdown();
}

Selector.prototype = {

	breakdown: function(){
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
		if ( ( part = part.trim() ).length || nested !== null ) {
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
	}

};

CSSTree.Selector = Selector;
