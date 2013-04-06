
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
		atrule: "@media screen",
		parts: [ "@media", "screen" ],
		position: {
			range: {
				start: 25,
				end: 57,
				length: 32
			},
			start: {
				line: 3,
				character: 1
			},
			end: {
				line: 5,
				character: 2
			},
			chunks: [
				{
					start: 25,
					end: 57,
					length: 32
				}
			]
		},
		rules: [
			{
				property: 'margin',
				value: '20px',
				parts: [ '20px' ],
				position: {
					range: {
						start: 42,
						end: 54,
						length: 12
					},
					start: {
						line: 4,
						character: 2
					},
					end: {
						line: 4,
						character: 14
					},
					chunks: [
						{
							start: 42,
							end: 54,
							length: 12
						}
					]
				}
			}
		]
	},
	{
		atrule: "@media print and (color), projection and (device-aspect-ratio: 16/9)",
		parts: [ "@media", "print", "and", "(color)", ",", "projection", "and", "(device-aspect-ratio: 16/9)" ],
		position: {
			range: {
				start: 59,
				end: 224,
				length: 165
			},
			start: {
				line: 7,
				character: 1
			},
			end: {
				line: 15,
				character: 2
			},
			chunks: [
				{
					start: 59,
					end: 224,
					length: 165
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
						start: 131,
						end: 143,
						length: 12
					},
					start: {
						line: 8,
						character: 2
					},
					end: {
						line: 8,
						character: 14
					},
					chunks: [
						{
							start: 131,
							end: 143,
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
						start: 146,
						end: 222,
						length: 76
					},
					start: {
						line: 9,
						character: 2
					},
					end: {
						line: 14,
						character: 3
					},
					chunks: [
						{
							start: 146,
							end: 222,
							length: 76
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
								start: 162,
								end: 174,
								length: 12
							},
							start: {
								line: 10,
								character: 3
							},
							end: {
								line: 10,
								character: 15
							},
							chunks: [
								{
									start: 162,
									end: 174,
									length: 12
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
								start: 178,
								end: 219,
								length: 41
							},
							start: {
								line: 11,
								character: 3
							},
							end: {
								line: 13,
								character: 4
							},
							chunks: [
								{
									start: 178,
									end: 219,
									length: 41
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
										start: 203,
										end: 214,
										length: 11
									},
									start: {
										line: 12,
										character: 4
									},
									end: {
										line: 12,
										character: 15
									},
									chunks: [
										{
											start: 203,
											end: 214,
											length: 11
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
