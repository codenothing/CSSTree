MUnit( 'Position.init', function( assert ) {
	var position = new CSSTree.Position( 25 );

	assert.deepEqual( 'range', position.range, { start: 25, end: 25, length: 0 } );
	assert.deepEqual( 'start', position.start, { line: 0, character: 0 } );
	assert.deepEqual( 'end', position.end, { line: 0, character: 0 } );
	assert.deepEqual( '_chunk', position._chunk, { start: 25, end: 25, length: 0 } );
	assert.deepEqual( 'chunks', position.chunks, [ { start: 25, end: 25, length: 0 } ] );
	assert.equal( '_parent', position._parent, undefined );
});
