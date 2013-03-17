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
	self.breakdown();
}

AtRule.prototype = {
	
	breakdown: function(){
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
	}

};

CSSTree.AtRule = AtRule;
