global.CSSTree = require( '../' );
global.MUnit = require( 'munit' );

// Defaults
MUnit.Defaults.Settings.stopOnFail = true;

// Run tests
MUnit.render( __dirname + '/../test/' );
