var munit = global.munit,
	CSSTree = global.CSSTree;

// Put core functionality at the highest priority
munit( 'CSSTree', { priority: 1.0 }, {

	// Add basic existance tests to ensure api stays consistent through versions
	// THESE TESTS SHOULD NOT CHANGE
	init: function( assert ) {
		var css = "body { color: red; }",
			tree = new CSSTree( css );

		assert.equal( 'css', tree.css, css )
			.equal( 'length', tree.length, css.length )
			.isArray( 'branches', tree.branches );
	},

	// Same concept, make sure sub objects stay consistent through versions
	// THESE TESTS SHOULD NOT CHANGE
	'static': function( assert ) {
		assert.isFunction( 'Position', CSSTree.Position )
			.isFunction( 'Selector', CSSTree.Selector )
			.isFunction( 'Comment', CSSTree.Comment )
			.isFunction( 'AtRule', CSSTree.AtRule )
			.isFunction( 'Rule', CSSTree.Rule );
	},

});
