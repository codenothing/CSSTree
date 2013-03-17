module.exports = [
	{
		nested: false,
		comment: "/*! preserved */"
	},
	{
		selector: 'emptiness',
		parts: [
			'emptiness'
		],
		rules: []
	},
	{
		atrule: '@import "another.css"',
		parts: [ '@import', '"another.css"' ]
	},
	{
		nested: false,
		comment: "/* I'm empty - delete me */"
	},
	{
		selector: 'empty',
		parts: [
			'empty'
		],
		rules: []
	},
	{
		atrule: '@media print',
		parts: [ '@media', 'print' ],
		branches: [
			{
				selector: '.noprint',
				parts: [ '.noprint' ],
				rules: [
					{
						property: 'display',
						value: 'none',
						parts: [ 'none' ]
					}
				]
			}
		]
	},
	{
		nested: true,
		comment: "/* this rule should be removed, not simply minified.*/"
	},
	{
		atrule: '@media screen',
		parts: [ '@media', 'screen' ],
		branches: [
			{
				selector: '.breakme',
				parts: [ '.breakme' ],
				rules: []
			},
			{
				selector: '.printonly',
				parts: [ '.printonly' ],
				rules: [
					{
						property: 'display',
						value: 'none',
						parts: [ 'none' ]
					}
				]
			}
		]
	}
];
