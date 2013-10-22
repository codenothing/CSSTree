module.exports = [
	{
		nested: false,
		comment: "/*\n\nThanks to yuicompressor for this test case: http://developer.yahoo.com/yui/compressor/css.html\n\n*/",
		position: {
			range: {
				start: 0,
				end: 101,
				length: 102
			},
			start: {
				line: 1,
				character: 1
			},
			end: {
				line: 5,
				character: 2
			},
			chunks: [
				{
					start: 0,
					end: 101,
					length: 102
				}
			]
		}
	},
	{
		nested: true,
		comment: "/* IE */",
		position: {
			range: {
				start: 142,
				end: 149,
				length: 8
			},
			start: {
				line: 7,
				character: 16
			},
			end: {
				line: 7,
				character: 23
			},
			chunks: [
				{
					start: 142,
					end: 149,
					length: 8
				}
			]
		}
	},
	{
		comment: "/* others */",
		nested: true,
		position: {
			range: {
				start: 214,
				end: 225,
				length: 12
			},
			start: {
				line: 10,
				character: 16
			},
			end: {
				line: 10,
				character: 27
			},
			chunks: [
				{
					start: 214,
					end: 225,
					length: 12
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
				start: 103,
				end: 227,
				length: 125
			},
			start: {
				line: 6,
				character: 1
			},
			end: {
				line: 11,
				character: 1
			},
			chunks: [
				{
					start: 103,
					end: 141,
					length: 39
				},
				{
					start: 150,
					end: 213,
					length: 64
				},
				{
					start: 226,
					end: 227,
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
						start: 128,
						end: 139,
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
							start: 128,
							end: 139,
							length: 12
						}
					]
				}
			},
			{
				property: 'voice-family',
				value: "\"\\\"}\\\"\"",
				parts: [ "\"\\\"}\\\"\"" ],
				position: {
					range: {
						start: 152,
						end: 172,
						length: 21
					},
					start: {
						line: 8,
						character: 2
					},
					end: {
						line: 8,
						character: 22
					},
					chunks: [
						{
							start: 152,
							end: 172,
							length: 21
						}
					]
				}
			},
			{
				property: 'voice-family',
				value: 'inherit',
				parts: [ 'inherit' ],
				position: {
					range: {
						start: 176,
						end: 196,
						length: 21
					},
					start: {
						line: 9,
						character: 2
					},
					end: {
						line: 9,
						character: 22
					},
					chunks: [
						{
							start: 176,
							end: 196,
							length: 21
						}
					]
				}
			},
			{
				property: 'width',
				value: '200px',
				parts: [ '200px' ],
				position: {
					range: {
						start: 200,
						end: 211,
						length: 12
					},
					start: {
						line: 10,
						character: 2
					},
					end: {
						line: 10,
						character: 13
					},
					chunks: [
						{
							start: 200,
							end: 211,
							length: 12
						}
					]
				}
			}
		]
	},
	{
		nested: true,
		comment: "/* others */",
		position: {
			range: {
				start: 265,
				end: 276,
				length: 12
			},
			start: {
				line: 14,
				character: 16
			},
			end: {
				line: 14,
				character: 27
			},
			chunks: [
				{
					start: 265,
					end: 276,
					length: 12
				}
			]
		}
	},
	{
		selector: 'html > body #elem',
		parts: [
			'html',
			'>',
			'body',
			'#elem'
		],
		position: {
			range: {
				start: 230,
				end: 278,
				length: 49
			},
			start: {
				line: 13,
				character: 1
			},
			end: {
				line: 15,
				character: 1
			},
			chunks: [
				{
					start: 230,
					end: 264,
					length: 35
				},
				{
					start: 277,
					end: 278,
					length: 2
				}
			]
		},
		rules: [
			{
				property: 'width',
				value: '200px',
				parts: [ '200px' ],
				position: {
					range: {
						start: 251,
						end: 262,
						length: 12
					},
					start: {
						line: 14,
						character: 2
					},
					end: {
						line: 14,
						character: 13
					},
					chunks: [
						{
							start: 251,
							end: 262,
							length: 12
						}
					]
				}
			}
		]
	}
];
