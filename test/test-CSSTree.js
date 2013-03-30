munit( 'CSSTree', { priority: 1.0 } );

// Add basic existance tests to ensure api stays consistent through versions
// THESE TESTS CANNOT CHANGE
munit( 'CSSTree.init', function( assert ) {
	var css = "body { color: red; }",
		tree = new CSSTree( css );

	assert.equal( 'css', tree.css, css );
	assert.equal( 'length', tree.length, css.length );
	assert.isArray( 'branches', tree.branches );
});

// Same concept, make sure sub objects stay consistent through versions
// THESE TESTS CANNOT CHANGE
munit( 'CSSTree.static', function( assert ) {
	assert.isFunction( 'Position', CSSTree.Position );
	assert.isFunction( 'Selector', CSSTree.Selector );
	assert.isFunction( 'Comment', CSSTree.Comment );
	assert.isFunction( 'AtRule', CSSTree.AtRule );
	assert.isFunction( 'Rule', CSSTree.Rule );
});
