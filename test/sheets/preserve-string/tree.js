module.exports = [
	{
		nested: true,
		comment: "/* <---- this is not a comment, should be be kept */"
	},
	{
		selector: '.sele',
		parts: [
			'.sele'
		],
		rules: [
			{
				property: 'content',
				value: "\"\\\"keep  \\\"    me\"",
				parts: [ "\"\\\"keep  \\\"    me\"" ]
			},
			{
				property: 'something',
				value: "'\\\\\\' .     . '",
				parts: [ "'\\\\\\' .     . '" ]
			},
			{
				property: 'else',
				value: "'empty{}'",
				parts: [ "'empty{}'" ]
			},
			{
				property: 'content',
				value: "\"/* test */\"",
				parts: [ "\"/* test */\"" ]
			}
		]
	}
];
