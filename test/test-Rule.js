MUnit( 'Rule.init', function( assert ) {
	var position = new CSSTree.Position( 25 ),
		rule = new CSSTree.Rule( " color ", " red !important ", position );

	assert.equal( 'property', rule.property, "color" );
	assert.equal( 'value', rule.value, "red !important" );
	assert.equal( 'position', rule.position, position );
	assert.deepEqual( 'parts', rule.parts, [ "red", "!important" ] );
});

MUnit( 'Rule.parts', function( assert ) {
	var rule = new CSSTree.Rule();

	[

		{
			name: 'Basic',
			value: 'red !important',
			parts: [
				'red',
				'!important'
			]
		},

		{
			name: 'Slash',
			value: '10px / 20px',
			parts: [
				'10px',
				'/',
				'20px'
			]
		},

		{
			name: 'Comma',
			value: 'Sans-Seriff,Comic-Sans',
			parts: [
				'Sans-Seriff',
				',',
				'Comic-Sans'
			]
		},

		{
			name: 'Value Separators',
			value: '10px "Red Light" \'Green Light\' url(http://www.google.com) "Testi\\"ng Esc\\"apes"',
			parts: [
				'10px',
				'"Red Light"',
				"'Green Light'",
				'url(http://www.google.com)',
				'"Testi\\"ng Esc\\"apes"'
			]
		}

	].forEach(function( object ) {
		rule.value = object.value;
		rule.breakdown();
		assert.deepEqual( object.name, rule.parts, object.parts );
	});
});
