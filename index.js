var fs = require( 'fs' ),
	_CSSTree = global.CSSTree;


// Grab CSSTree files
global.CSSTree = module.exports = require( './lib/CSSTree.js' );
require( './build/libs.js' ).forEach(function( file ) {
	require( './lib/' + file );
});


// Attach exporter for parent modules
CSSTree.exportScript = function( callback ) {
	if ( callback ) {
		fs.readFile( __dirname + '/dist/CSSTree.js', 'utf8', callback );
	}
	else {
		return fs.readFileSync( __dirname + '/dist/CSSTree.js', 'utf8' );
	}
};


// Clear global case
global.CSSTree = _CSSTree;
