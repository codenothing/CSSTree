module.exports = [
	{
		nested: true,
		comment: "/* ie5 mac comment hack \\*/"
	},
	{
		selector: 'body',
		parts: [
			'body'
		],
		rules: [
			{
				property: 'font-size',
				value: '12pt',
				parts: [ '12pt' ]
			},
			{
				property: 'font-size',
				value: '5pt',
				parts: [ '5pt' ]
			}
		]
	}
];
