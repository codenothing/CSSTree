module.exports = [
	{
		atrule: '@media screen',
		parts: [ '@media', 'screen' ],
		rules: [
			{
				property: 'margin',
				value: '20px',
				parts: [ '20px' ]
			}
		]
	},
	{
		atrule: '@media print and (color), projection and (device-aspect-ratio: 16/9)',
		parts: [ '@media', 'print', 'and', '(color)', ',', 'projection', 'and', '(device-aspect-ratio: 16/9)' ],
		rules: [
			{
				property: 'margin',
				value: '10px',
				parts: [ '10px' ]
			}
		],
		branches: [
			{
				atrule: '@page :left',
				parts: [ '@page', ':left' ],
				rules: [
					{
						property: 'color',
						value: 'black',
						parts: [ 'black' ]
					}
				],
				branches: [
					{
						atrule: '@bottom-left-corner',
						parts: [ '@bottom-left-corner' ],
						rules: [
							{
								property: 'margin',
								value: '2cm',
								parts: [ '2cm' ]
							}
						]
					}
				]
			}
		]
	}
];
