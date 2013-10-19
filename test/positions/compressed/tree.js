module.exports = [
	{
		selector: '#a',
		parts: [ '#a' ],
		position: {
			range: {
				start: 0,
				end: 15,
				length: 15
			},
			start: {
				line: 1,
				character: 1
			},
			end: {
				line: 1,
				character: 16
			},
			chunks: [
				{
					start: 0,
					end: 15,
					length: 15
				}
			]
		},
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ],
				position: {
					range: {
						start: 3,
						end: 14,
						length: 11
					},
					start: {
						line: 1,
						character: 4
					},
					end: {
						line: 1,
						character: 15
					},
					chunks: [
						{
							start: 3,
							end: 14,
							length: 11
						}
					]
				},
			},
		],
	},
	{
		selector: '#b',
		parts: [ '#b' ],
		position: {
			range: {
				start: 15,
				end: 84,
				length: 69
			},
			start: {
				line: 1,
				character: 16
			},
			end: {
				line: 1,
				character: 85
			},
			chunks: [
				{
					start: 15,
					end: 84,
					length: 69
				}
			]
		},
		rules: [
			{
				property: 'margin-top',
				value: '1px',
				parts: [ '1px' ],
				position: {
					range: {
						start: 18,
						end: 32,
						length: 14
					},
					start: {
						line: 1,
						character: 19
					},
					end: {
						line: 1,
						character: 33
					},
					chunks: [
						{
							start: 18,
							end: 32,
							length: 14
						}
					]
				},
			},
			{
				property: 'margin-right',
				value: '1px',
				parts: [ '1px' ],
				position: {
					range: {
						start: 33,
						end: 49,
						length: 16
					},
					start: {
						line: 1,
						character: 34
					},
					end: {
						line: 1,
						character: 50
					},
					chunks: [
						{
							start: 33,
							end: 49,
							length: 16
						}
					]
				},
			},
			{
				property: 'margin-bottom',
				value: '1px',
				parts: [ '1px' ],
				position: {
					range: {
						start: 50,
						end: 67,
						length: 17
					},
					start: {
						line: 1,
						character: 51
					},
					end: {
						line: 1,
						character: 68
					},
					chunks: [
						{
							start: 50,
							end: 67,
							length: 17
						}
					]
				},
			},
			{
				property: 'margin-left',
				value: '1px',
				parts: [ '1px' ],
				position: {
					range: {
						start: 68,
						end: 83,
						length: 15
					},
					start: {
						line: 1,
						character: 69
					},
					end: {
						line: 1,
						character: 84
					},
					chunks: [
						{
							start: 68,
							end: 83,
							length: 15
						}
					]
				},
			},
		]
	},
];
