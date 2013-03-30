global.CSSTree = require( '../' );
global.munit = require( 'munit' );

// Defaults
munit.defaults.settings.stopOnFail = true;

// Run tests
munit.render( __dirname + '/../test/', { junit: __dirname + '/results/' } );
