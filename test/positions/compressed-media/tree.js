
module.exports = [
	{
		atrule: "@import url(style.css)",
		parts: [ "@import", "url(style.css)" ],
		position: {
			range: {
				start: 0,
				end: 22,
				length: 22
			},
			start: {
				line: 1,
				character: 1
			},
			end: {
				line: 1,
				character: 23
			},
			chunks: [
				{
					start: 0,
					end: 22,
					length: 22
				}
			]
		}
	},
	{
		atrule: "@media print and (color), projection and (device-aspect-ratio: 16/9)",
		parts: [ "@media", "print", "and", "(color)", ",", "projection", "and", "(device-aspect-ratio: 16/9)" ],
		position: {
			range: {
				start: 23,
				end: 162,
				length: 139
			},
			start: {
				line: 1,
				character: 24
			},
			end: {
				line: 1,
				character: 163
			},
			chunks: [
				{
					start: 23,
					end: 162,
					length: 139
				}
			]
		},
		rules: [
			{
				property: 'margin',
				value: '10px',
				parts: [ '10px' ],
				position: {
					range: {
						start: 92,
						end: 104,
						length: 12
					},
					start: {
						line: 1,
						character: 93
					},
					end: {
						line: 1,
						character: 105
					},
					chunks: [
						{
							start: 92,
							end: 104,
							length: 12
						}
					]
				}
			}
		],
		branches: [
			{
				atrule: "@page :left",
				parts: [ "@page", ":left" ],
				position: {
					range: {
						start: 105,
						end: 161,
						length: 56
					},
					start: {
						line: 1,
						character: 106
					},
					end: {
						line: 1,
						character: 162
					},
					chunks: [
						{
							start: 105,
							end: 161,
							length: 56
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
								start: 117,
								end: 128,
								length: 11
							},
							start: {
								line: 1,
								character: 118
							},
							end: {
								line: 1,
								character: 129
							},
							chunks: [
								{
									start: 117,
									end: 128,
									length: 11
								}
							]
						}
					}
				],
				branches: [
					{
						atrule: "@bottom-left-corner",
						parts: [ "@bottom-left-corner" ],
						position: {
							range: {
								start: 129,
								end: 160,
								length: 31
							},
							start: {
								line: 1,
								character: 130
							},
							end: {
								line: 1,
								character: 161
							},
							chunks: [
								{
									start: 129,
									end: 160,
									length: 31
								}
							]
						},
						rules: [
							{
								property: 'margin',
								value: '2cm',
								parts: [ '2cm' ],
								position: {
									range: {
										start: 149,
										end: 159,
										length: 10
									},
									start: {
										line: 1,
										character: 150
									},
									end: {
										line: 1,
										character: 160
									},
									chunks: [
										{
											start: 149,
											end: 159,
											length: 10
										}
									]
								}
							}
						]
					}
				]
			}
		]
	}
];
