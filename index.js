var fs = require( 'fs' ),
	_CSSTree = global.CSSTree,
	_StringIterator = global.StringIterator;


// Grab CSSTree files
global.StringIterator = require( "string-iterator" );
global.CSSTree = module.exports = require( './lib/CSSTree.js' );
require( './build/libs.js' ).forEach(function( file ) {
	require( './lib/' + file );
});


// Attach exporter for parent modules
global.CSSTree.exportScript = function( callback ) {
	if ( callback ) {
		fs.readFile( __dirname + '/dist/CSSTree.js', 'utf8', callback );
	}
	else {
		return fs.readFileSync( __dirname + '/dist/CSSTree.js', 'utf8' );
	}
};


// Clear global case
global.StringIterator = _StringIterator;
global.CSSTree = _CSSTree;
