module.exports = [
	{
		nested: false,
		comment: "/*  example from https://developer.mozilla.org/en/CSS/opacity */"
	},
	{
		selector: 'pre',
		parts: [
			'pre'
		],
		rules: [
			{
				property: "border",
				value: "solid red",
				parts: [
					'solid',
					'red'
				]
			},
			{
				property: "opacity",
				value: "0.8",
				parts: [ "0.8" ]
			},
			{
				property: "-ms-filter",
				value: '" progid:DXImageTransform.Microsoft.Alpha(Opacity=80)"',
				parts: [ '" progid:DXImageTransform.Microsoft.Alpha(Opacity=80)"' ]
			},
			{
				property: "filter",
				value: "PROGID:DXImageTransform.Microsoft.Alpha(Opacity=80)",
				parts: [ "PROGID:DXImageTransform.Microsoft.Alpha(Opacity=80)" ]
			},
			{
				property: "zoom",
				value: "1",
				parts: [ "1" ]
			}
		]
	},
	{
		selector: 'code',
		parts: [
			'code'
		],
		rules: [
			{
				property: '-ms-filter',
				value: '" PROGID:DXImageTransform.Microsoft.Alpha(Opacity=80)"',
				parts: [ '" PROGID:DXImageTransform.Microsoft.Alpha(Opacity=80)"' ]
			},
			{
				property: 'filter',
				value: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80 )',
				parts: [ 'progid:DXImageTransform.Microsoft.Alpha(Opacity=80 )' ]
			}
		]
	}
];
