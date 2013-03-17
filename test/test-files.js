var fs = require( 'fs' ),
	SHEETS = __dirname + '/sheets/',
	POSITIONS = __dirname + '/positions/';


function RemovePositions( array ) {
	array.forEach(function( object ) {
		if ( object.position ) {
			delete object.position;
		}

		if ( object.rules ) {
			RemovePositions( object.rules );
		}

		if ( object.branches ) {
			RemovePositions( object.branches );
		}
	});

	return array;
}

// Lower sheet rendering priority to allow focused tests to run first
MUnit( 'Files', { priority: MUnit.PRIORITY_LOW } );


// Sheet testing
MUnit( 'Files.Sheets', function( assert ) {
	fs.readdirSync( SHEETS ).forEach(function( dir ) {
		if ( ! fs.statSync( SHEETS + dir ).isDirectory() ) {
			return;
		}

		var sheet = fs.readFileSync( SHEETS + dir + '/sheet.css', 'utf8' ),
			match = require( SHEETS + dir + '/tree.js' );

		assert.deepEqual( 'sheet-' + dir, RemovePositions( CSSTree( sheet ).branches ), match );
	});
});


// Position Testing
MUnit( 'Files.Positions', function( assert ) {
	fs.readdirSync( POSITIONS ).forEach(function( dir ) {
		if ( ! fs.statSync( POSITIONS + dir ).isDirectory() ) {
			return;
		}

		var sheet = fs.readFileSync( POSITIONS + dir + '/sheet.css', 'utf8' ),
			match = require( POSITIONS + dir + '/tree.js' );

		assert.deepEqual( 'positions-' + dir, CSSTree( sheet ).branches, match );
	});
});
