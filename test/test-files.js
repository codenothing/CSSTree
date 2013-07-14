var munit = global.munit,
	CSSTree = global.CSSTree,
	fs = require( 'fs' ),
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
munit( 'Files', { priority: munit.PRIORITY_LOW }, {

	// Sheet testing
	sheets: function( assert ) {
		fs.readdirSync( SHEETS ).forEach(function( dir ) {
			if ( ! fs.statSync( SHEETS + dir ).isDirectory() ) {
				return;
			}

			// Sheet setup
			var name = 'sheet-' + dir,
				branch = name + '-branch-',
				sheet = fs.readFileSync( SHEETS + dir + '/sheet.css', 'utf8' ),
				branches = RemovePositions( CSSTree( sheet ).branches ),
				match = require( SHEETS + dir + '/tree.js' );

			assert.deepEqual( name, branches, match );
		});
	},

	// Position Testing
	positions: function( assert ) {
		fs.readdirSync( POSITIONS ).forEach(function( dir ) {
			if ( ! fs.statSync( POSITIONS + dir ).isDirectory() ) {
				return;
			}

			// Sheet setup
			var name = 'positions-' + dir,
				branch = name + '-branch-',
				sheet = fs.readFileSync( POSITIONS + dir + '/sheet.css', 'utf8' ),
				branches = CSSTree( sheet ).branches,
				match = require( POSITIONS + dir + '/tree.js' );

			assert.deepEqual( name, branches, match );
		});
	},

});
