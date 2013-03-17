module.exports = [
	{
		selector: '#elementarr',
		parts: [
			'#elementarr'
		],
		rules: [
			{
				property: 'width',
				value: '1px',
				parts: [ '1px' ]
			},
			{
				property: '*width',
				value: '3pt',
				parts: [ '3pt' ]
			},
			{
				property: '_width',
				value: '2em',
				parts: [ '2em' ]
			}
		]
	}
];
