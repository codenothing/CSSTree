module.exports = [
	{
		atrule: '@media screen',
		parts: [ '@media', 'screen' ],
		branches: [
			{
				selector: 'body',
				parts: [ 'body' ],
				rules: [
					{
						property: 'content',
						value: "\\ntest",
						parts: [ "\\ntest" ]
					}
				]
			}
		]
	}
];
