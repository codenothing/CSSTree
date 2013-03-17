module.exports = [
	{
		selector: "#test span.hello,\n#test2 span.hello[id='yes'] ~ div",
		parts: [
			"#test",
			[
				"span",
				".hello"
			],
			",",
			"#test2",
			[
				"span",
				".hello",
				"[id='yes']"
			],
			"~",
			"div"
		],
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ]
			}
		]
	},
	{
		selector: "span.a.b.c.d",
		parts: [
			[
				"span",
				".a",
				".b",
				".c",
				".d"
			]
		],
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ]
			}
		]
	},
	{
		selector: "body > div[title='spacing test\\'s'] + a[href$='nospace'] :first-child",
		parts: [
			"body",
			">",
			[
				"div",
				"[title='spacing test\\'s']"
			],
			"+",
			[
				"a",
				"[href$='nospace']"
			],
			":first-child"
		],
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ]
			}
		]
	},
	{
		selector: "body > div.a.b[title='spacing test\\'s'].c.d + a.a.b[href$=\"space ]\"].c.d :first-child",
		parts: [
			"body",
			">",
			[
				"div",
				".a",
				".b",
				"[title='spacing test\\'s']",
				".c",
				".d"
			],
			"+",
			[
				"a",
				".a",
				".b",
				"[href$=\"space ]\"]",
				".c",
				".d"
			],
			":first-child"
		],
		rules: [
			{
				property: 'color',
				value: 'black',
				parts: [ 'black' ]
			}
		]
	}
];
