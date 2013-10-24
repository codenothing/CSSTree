module.exports = [
	{
		nested: true,
		comment: "/*prop*/",
		position: {
			range: {
				start: 30,
				end: 37,
				length: 8
			},
			start: {
				line: 2,
				character: 7
			},
			end: {
				line: 2,
				character: 14
			},
			chunks: [
				{
					start: 30,
					end: 37,
					length: 8
				}
			]
		}
	},
	{
		nested: true,
		comment: "/*value*/",
		position: {
			range: {
				start: 39,
				end: 47,
				length: 9
			},
			start: {
				line: 2,
				character: 16
			},
			end: {
				line: 2,
				character: 24
			},
			chunks: [
				{
					start: 39,
					end: 47,
					length: 9
				}
			]
		}
	},
	{
		nested: true,
		comment: "/*rules*/",
		position: {
			range: {
				start: 55,
				end: 63,
				length: 9
			},
			start: {
				line: 2,
				character: 32
			},
			end: {
				line: 2,
				character: 40
			},
			chunks: [
				{
					start: 55,
					end: 63,
					length: 9
				}
			]
		}
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
		position: {
			range: {
				start: 0,
				end: 65,
				length: 66
			},
			start: {
				line: 1,
				character: 1
			},
			end: {
				line: 3,
				character: 1
			},
			chunks: [
				{
					start: 0,
					end: 29,
					length: 30
				},
				{
					start: 38,
					end: 38,
					length: 1
				},
				{
					start: 48,
					end: 54,
					length: 7
				},
				{
					start: 64,
					end: 65,
					length: 2
				}
			]
		},
		rules: [
			{
				property: 'width',
				value: '100px',
				parts: [ '100px' ],
				position: {
					range: {
						start: 25,
						end: 52,
						length: 28
					},
					start: {
						line: 2,
						character: 2
					},
					end: {
						line: 2,
						character: 29
					},
					chunks: [
						{
							start: 25,
							end: 29,
							length: 5
						},
						{
							start: 38,
							end: 38,
							length: 1
						},
						{
							start: 48,
							end: 52,
							length: 5
						},
					]
				}
			},
		]
	},
	{
		nested: true,
		comment: "/* first level */",
		position: {
			range: {
				start: 85,
				end: 101,
				length: 17
			},
			start: {
				line: 6,
				character: 2
			},
			end: {
				line: 6,
				character: 18
			},
			chunks: [
				{
					start: 85,
					end: 101,
					length: 17
				}
			]
		}
	},
	{
		nested: true,
		comment: "/* second level */",
		position: {
			range: {
				start: 126,
				end: 143,
				length: 18
			},
			start: {
				line: 10,
				character: 3
			},
			end: {
				line: 10,
				character: 20
			},
			chunks: [
				{
					start: 126,
					end: 143,
					length: 18
				}
			]
		}
	},
	{
		nested: true,
		comment: "/*nested prop*/",
		position: {
			range: {
				start: 152,
				end: 166,
				length: 15
			},
			start: {
				line: 11,
				character: 8
			},
			end: {
				line: 11,
				character: 22
			},
			chunks: [
				{
					start: 152,
					end: 166,
					length: 15
				}
			]
		}
	},
	{
		nested: true,
		comment: "/*nested value*/",
		position: {
			range: {
				start: 168,
				end: 183,
				length: 16
			},
			start: {
				line: 11,
				character: 24
			},
			end: {
				line: 11,
				character: 39
			},
			chunks: [
				{
					start: 168,
					end: 183,
					length: 16
				}
			]
		}
	},
	{
		atrule: '@media screen',
		parts: [
			'@media',
			'screen',
		],
		position: {
			range: {
				start: 68,
				end: 192,
				length: 125
			},
			start: {
				line: 5,
				character: 1
			},
			end: {
				line: 13,
				character: 1
			},
			chunks: [
				{
					start: 68,
					end: 84,
					length: 17
				},
				{
					start: 101,
					end: 125,
					length: 25
				},
				{
					start: 143,
					end: 151,
					length: 9
				},
				{
					start: 166,
					end: 167,
					length: 2
				},
				{
					start: 183,
					end: 192,
					length: 10
				},
			]
		},
		rules: [
			{
				property: 'margin',
				value: '20px',
				parts: [ '20px' ],
				position: {
					range: {
						start: 104,
						end: 115,
						length: 12
					},
					start: {
						line: 7,
						character: 2
					},
					end: {
						line: 7,
						character: 13
					},
					chunks: [
						{
							start: 104,
							end: 115,
							length: 12
						}
					]
				}
			}
		],
		branches: [
			{
				selector: 'b',
				parts: [
					'b',
				],
				position: {
					range: {
						start: 120,
						end: 190,
						length: 71
					},
					start: {
						line: 9,
						character: 2
					},
					end: {
						line: 12,
						character: 2
					},
					chunks: [
						{
							start: 120,
							end: 125,
							length: 6
						},
						{
							start: 143,
							end: 151,
							length: 9
						},
						{
							start: 166,
							end: 167,
							length: 2
						},
						{
							start: 183,
							end: 190,
							length: 8
						},
					]
				},
				rules: [
					{
						property: 'color',
						value: 'red',
						parts: [ 'red' ],
						position: {
							range: {
								start: 147,
								end: 186,
								length: 40
							},
							start: {
								line: 11,
								character: 3
							},
							end: {
								line: 11,
								character: 42
							},
							chunks: [
								{
									start: 147,
									end: 186,
									length: 40
								}
							]
						}
					}
				]
			}
		]
	}
];
