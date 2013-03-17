module.exports = [
	{
		selector: '#sel-o',
		parts: [
			'#sel-o'
		],
		rules: [
			{
				property: 'content',
				value: "\"on\\\"ce upon \\\na time\"",
				parts: [ "\"on\\\"ce upon \\\na time\"" ]
			},
			{
				property: 'content',
				value: "\"once upon \\\na ti\\'me\"",
				parts: [ "\"once upon \\\na ti\\'me\"" ]
			}
		]
	}
];
