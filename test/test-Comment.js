MUnit( 'Comment.init', function( assert ) {
	var position = new CSSTree.Position( 25 ),
		comment = new CSSTree.Comment( " /* Test Comment */ ", null, position );
	
	assert.equal( 'comment', comment.comment, "/* Test Comment */" );
	assert.equal( 'nested', comment.nested, false );
	assert.equal( 'position', comment.position, position );
});
