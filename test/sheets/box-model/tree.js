module.exports = [
	{
		nested: false,
		comment: "/*\n\nThanks to yuicompressor for this test case: http://developer.yahoo.com/yui/compressor/css.html\n\n*/"
	},
	{
		nested: true,
		comment: "/* IE */"
	},
	{
		nested: true,
		comment: "/* others */"
	},
	{
		selector: '#elem span.color span',
		parts: [
			'#elem',
			[
				'span',
				'.color'
			],
			'span'
		],
		rules: [
			{
				property: 'width',
				value: '100px',
				parts: [ '100px' ]
			},
			{
				property: 'voice-family',
				value: "\"\\\"}\\\"\"",
				parts: [ "\"\\\"}\\\"\"" ]
			},
			{
				property: 'voice-family',
				value: 'inherit',
				parts: [ 'inherit' ]
			},
			{
				property: 'width',
				value: '200px',
				parts: [ '200px' ]
			}
		]
	},
	{
		nested: true,
		comment: "/* others */"
	},
	{
		selector: 'html > body #elem',
		parts: [
			'html',
			'>',
			'body',
			'#elem'
		],
		rules: [
			{
				property: 'width',
				value: '200px',
				parts: [ '200px' ]
			}
		]
	}
];
