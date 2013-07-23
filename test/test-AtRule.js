var munit = global.munit,
	CSSTree = global.CSSTree;

munit( 'AtRule', {

	// Initialization
	init: function( assert ) {
		var position = new CSSTree.Position( 25 ),
			atrule = new CSSTree.AtRule( " @import 'test.css' ", position );

		assert.equal( 'atrule', atrule.atrule, "@import 'test.css'" );
		assert.equal( 'position', atrule.position, position );
		assert.equal( 'rules', atrule.rules, undefined );
		assert.equal( 'branches', atrule.branches, undefined );
		assert.deepEqual( 'parts', atrule.parts, [ "@import", "'test.css'" ] );
	},

	// Testing string breakdown handle
	breakdown: function( assert ) {
		var atrule = new CSSTree.AtRule();

		[

			{
				name: 'Basic',
				atrule: "@import 'test.css'",
				parts: [
					"@import",
					"'test.css'"
				]
			},

			{
				name: 'Extendend',
				atrule: '@media print and (color), projection and (device-aspect-ratio: 16/9)',
				parts: [
					'@media',
					'print',
					'and',
					'(color)',
					',',
					'projection',
					'and',
					'(device-aspect-ratio: 16/9)'
				]
			},

			{
				name: 'URL Import',
				atrule: "@import url(\"crazyurl.css?semi=yes;&email=corey@codenothing.com\")",
				parts: [
					"@import",
					"url(\"crazyurl.css?semi=yes;&email=corey@codenothing.com\")"
				]
			},

			{
				name: 'Escaped Quotes',
				atrule: "@import url('crazyurl.css?semi=yes;&email=core\\'y@codenothing.com')",
				parts: [
					"@import",
					"url('crazyurl.css?semi=yes;&email=core\\'y@codenothing.com')"
				]
			}

		].forEach(function( object ) {
			atrule.atrule = object.atrule;
			atrule.breakdown();
			assert.deepEqual( object.name, atrule.parts, object.parts );
		});
	}

});
