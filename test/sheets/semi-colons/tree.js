module.exports = [
	{
		selector: 'p :first-line',
		parts: [
			'p',
			':first-line'
		],
		rules: [
			{
				property: 'ba',
				value: 'zinga',
				parts: [ 'zinga' ]
			},
			{
				property: 'foo',
				value: 'bar',
				parts: [ 'bar' ]
			}
		]
	}
];
