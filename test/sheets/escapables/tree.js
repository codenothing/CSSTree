module.exports = [
	{
		selector: '#one',
		parts: [
			'#one'
		],
		rules: [
			{
				property: 'background',
				value: 'transparent url(http://www.example.com/someimage1.png?add=semi;) no-repeat top center',
				parts: [
					'transparent',
					'url(http://www.example.com/someimage1.png?add=semi;)',
					'no-repeat',
					'top',
					'center'
				]
			}
		]
	}
];
