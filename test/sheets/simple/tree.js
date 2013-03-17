module.exports = [
	{
		selector: '#test',
		parts: [
			'#test'
		],
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ]
			},
			{
				property: 'font-size',
				value: '20px',
				parts: [ '20px' ]
			},
			{
				property: 'background',
				value: 'red url(http://www.example.com/someimg.png)',
				parts: [
					'red',
					'url(http://www.example.com/someimg.png)'
				]
			}
		]
	},
	{
		comment: '/* Comment Block */',
		nested: false
	},
	{
		selector: '#next',
		parts: [
			'#next'
		],
		rules: [
			{
				property: 'position',
				value: 'absolute',
				parts: [ 'absolute' ]
			},
			{
				property: 'margin',
				value: '10px 11px 12px 0',
				parts: [
					'10px',
					'11px',
					'12px',
					'0'
				]
			},
			{
				property: 'padding',
				value: '1px 2px 3px',
				parts: [
					'1px',
					'2px',
					'3px'
				]
			}
		]
	},
	{
		comment: "/*\nMulti Line Comment\n*/",
		nested: false
	},
	{
		atrule: "@import 'sheet.css'",
		parts: [ "@import", "'sheet.css'" ]
	},
	{
		atrule: "@charset 'utf-8'",
		parts: [ "@charset", "'utf-8'" ]
	}
];
