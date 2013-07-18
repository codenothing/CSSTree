var rwhitespace = /(\s|\t|\r\n|\r|\n)/,
	rvalueseparator = /\/|,/,
	rvalueseek = /"|'|\(/;


function Rule( property, value, position ) {
	var self = this;

	if ( ! ( self instanceof Rule ) ) {
		return new Rule( property, value, position );
	}

	self.property = ( property || '' ).trim();
	self.value = ( value || '' ).trim();
	self.position = position;
	self.parts = [];
	self.breakdown();
}

Rule.prototype = {

	breakdown: function(){
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
	}

};

global.CSSTree.Rule = Rule;
