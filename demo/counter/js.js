jQuery(function( jQuery ) {
	var textbox = jQuery( 'textarea' ),
		selectStart = jQuery( 'input[name=start]' ),
		selectEnd = jQuery( 'input[name=end]' ),
		positionInfo = jQuery( '#position' );
	
	// Update caret position on any user action
	textbox.on( 'keyup', updatePosition )
		.on( 'click', updatePosition )
		.on( 'focus', updatePosition );
	

	// Watch for highlight trigger
	jQuery( 'form' ).on( 'submit', function( event ) {
		select(
			parseInt( selectStart.val() || '0', 10 ),
			parseInt( selectEnd.val() || '0', 10 )
		);

		scroll();
		return false;
	});


	// Highlighting input ranges
	function select( start, end ) {
		var element = textbox[ 0 ], range;

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
		var current = textbox.scrollTop(),
			caret = textbox.textareaHelper( 'caretPos' ).top,
			height = textbox.height(),
			ypos = current + caret - parseInt( height / 2, 10 );

		if ( ypos < 0 ) {
			ypos = 0;
		}

		textbox.scrollTop( ypos );
	}

	// Greps the current caret position in relation to the string in the textbox (not x,y coord)
	function caretPos(){
		var element = textbox[ 0 ], pos = 0;

		if ( element.selectionStart ) {
			pos = element.selectionStart;
		}

		return pos;
	}

	// Update character position info
	function updatePosition(){
		positionInfo.html( caretPos() );
	}
});
