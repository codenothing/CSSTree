window.jQuery(function( jQuery ) {
	var CSSTree = window.CSSTree,
		alert = window.alert,
		contentArea = jQuery( '.content' ),
		textarea = jQuery( 'textarea' ),
		button = jQuery( 'button' ),
		result = jQuery( 'pre' ),
		injectLinks = jQuery( 'input[name=links]' ),
		showPositions = jQuery( 'input[name=positions]' ),
		positionsCallback = function( key, value ) {
			return key === 'position' ? undefined : value;
		};
	
	// Inserts links into tree for highlighting
	function insertLinks( branches ) {
		branches.forEach(function( branch ) {
			if ( branch.position ) {
				branch.highlight = "Range [" + branch.position.range.start + "," + branch.position.range.end + "]";
			}

			if ( branch.rules && branch.rules.length ) {
				branch.rules.forEach(function( rule ) {
					if ( rule.position ) {
						rule.highlight = "Range [" + rule.position.range.start + "," + rule.position.range.end + "]";
					}
				});
			}

			if ( branch.branches && branch.branches.length ) {
				insertLinks( branch.branches );
			}
		});
	}

	// Highlighting input ranges
	function select( start, end ) {
		var element = textarea[ 0 ], range;

		if ( start >= end ) {
			alert( 'Start Must Be Less Than End' );
			return;
		}
		else if ( element.createTextRange ) {
			range = element.createTextRange();
			range.collapse( true );
			range.moveStart( 'character', start );
			range.moveEnd( 'character', end );
			range.select();
		}
		else if ( element.setSelectionRange ) {
			element.setSelectionRange( start, end );
		}
		else if ( element.selectionStart ) {
			element.selectionStart = start;
			element.selectionEnd = end;
		}
	}

	// Scroll text area to highlighted section (centered if possible)
	function scroll(){
		var current = textarea.scrollTop(),
			caret = textarea.textareaHelper( 'caretPos' ).top,
			height = textarea.height(),
			ypos = current + caret - parseInt( height / 2, 10 );

		if ( ypos < 0 ) {
			ypos = 0;
		}

		textarea.scrollTop( ypos );
	}

	// Watch for highlighting
	result.on( 'click', 'a', function(){
		var parts = jQuery( this ).attr( 'data-pos' ).split( ',' ),
			start = parseInt( parts[ 0 ] || '', 10 ),
			end = parseInt( parts[ 1 ] || '', 10 ) + 1;

		if ( end > start ) {
			select( start, end );
			scroll();
		}

		return false;
	});
	
	// Watch for run button
	button.on( 'click', function(){
		var tree = CSSTree( textarea.val() || '' ).branches,
			string;

		if ( injectLinks.is( ':checked' ) ) {
			insertLinks( tree );
		}
		
		string = JSON.stringify( tree, showPositions.is( ':checked' ) ? null : positionsCallback, 2 );
		string = string.substr( 1, string.length - 2 ).replace( /\\n/g, "\n" ).replace( /\\t/g, "\t" );
		string = string.replace( /"highlight": "Range \[(\d+)\,(\d+)\]"/g, '"highlight": "<a href="#" data-pos="$1,$2">Range [$1,$2]</a>"' );
		result.removeClass( 'hide' ).html( string );
		contentArea.addClass( 'active' );
	});
});
