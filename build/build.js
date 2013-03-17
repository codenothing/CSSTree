var fs = require( 'fs' ),
	async = require( 'async' ),
	libs = require( './libs.js' ),
	ROOT_DIR = __dirname + '/../',
	LIB_DIR = ROOT_DIR + 'lib/',
	DIST_DIR = ROOT_DIR + 'dist/',
	DEMO_DIR = ROOT_DIR + 'demo/';

libs.unshift( 'headers.txt', 'CSSTree.js' );
async.map( libs,
	function( file, callback ) {
		fs.readFile( ( file == 'headers.txt' ? __dirname + '/' : LIB_DIR ) + file, 'utf8', callback );
	},
	function( e, results ) {
		if ( e ) {
			throw e;
		}

		var contents = results.shift();
		while ( results.length ) {
			contents += "(function( global, undefined ) {\n\n" +
				results.shift() +
				"\n\n})( this );" +
				( results.length ? "\n\n" : "" );
		}

		async.map( [ DIST_DIR, DEMO_DIR ],
			function( dir, callback ) {
				fs.writeFile( dir + 'CSSTree.js', contents, 'utf8', callback );
			},
			function( e ) {
				if ( e ) {
					throw e;
				}

				console.log( "\n\nCSSTree Built Out.\n\n\n" );
			}
		);
	}
);
