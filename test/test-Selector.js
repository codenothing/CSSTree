var munit = global.munit,
	CSSTree = global.CSSTree;

munit( 'Selector.init', function( assert ) {
	var position = new CSSTree.Position( 25 ),
		rules = [ 1, 2, 3 ],
		selector = new CSSTree.Selector( " html body ", rules, position );

	assert.equal( 'selector', selector.selector, "html body" );
	assert.equal( 'position', selector.position, position );
	assert.equal( 'rules', selector.rules, rules );
	assert.equal( 'branches', selector.branches, undefined );
	assert.deepEqual( 'parts', selector.parts, [ "html", "body" ] );
});

munit( 'Selector.parts', function( assert ) {
	var selector = new CSSTree.Selector();

	[
		{
			name: 'Basic',
			selector: "html body",
			parts: [
				'html',
				'body'
			]
		},

		{
			name: 'Nested',
			selector: "html body.class span",
			parts: [
				'html',
				[
					'body',
					'.class'
				],
				'span'
			]
		},

		{
			name: 'Brace',
			selector: "div a[data-tag='testing']",
			parts: [
				'div',
				[
					'a',
					"[data-tag='testing']"
				]
			]
		},

		{
			name: 'Nested Brace Filter',
			selector: "div a.class[data-tag='testing']:first-child",
			parts: [
				'div',
				[
					'a',
					'.class',
					"[data-tag='testing']",
					':first-child'
				]
			]
		},

		{
			name: 'Separator',
			selector: "div > p",
			parts: [
				'div',
				'>',
				'p'
			]
		},

		{
			name: 'All Separators',
			selector: "div > p ~ a + b, *",
			parts: [
				'div',
				'>',
				'p',
				'~',
				'a',
				'+',
				'b',
				',',
				'*'
			]
		},

		{
			name: 'Brace Separator',
			selector: "div p, [data-target=alpha]",
			parts: [
				'div',
				'p',
				',',
				'[data-target=alpha]'
			]
		},

		{
			name: 'Brace Separator Nested',
			selector: "div p:first-child, [data-target=alpha]:last-child",
			parts: [
				'div',
				[
					'p',
					':first-child'
				],
				',',
				[
					'[data-target=alpha]',
					':last-child'
				]
			]
		}

	].forEach(function( object ) {
		selector.selector = object.selector;
		selector.breakdown();
		assert.deepEqual( object.name, selector.parts, object.parts );
	});
});
