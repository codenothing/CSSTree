module.exports = [
	{
		selector: "#red",
		parts: [
			'#red'
		],
		rules: [
			{
				property: 'border-radius',
				value: '1px 2px 3px 4px/5px 6px 7px 8px',
				parts: [
					'1px',
					'2px',
					'3px',
					'4px',
					'/',
					'5px',
					'6px',
					'7px',
					'8px'
				]
			},
			{
				property: 'border-radius',
				value: '1px 2px 3px 4px / 5px 6px 7px 8px',
				parts: [
					'1px',
					'2px',
					'3px',
					'4px',
					'/',
					'5px',
					'6px',
					'7px',
					'8px'
				]
			},
			{
				property: 'box-shadow',
				value: 'inset 3px 2px 6px,3px 1px 10px',
				parts: [
					'inset',
					'3px',
					'2px',
					'6px',
					',',
					'3px',
					'1px',
					'10px'
				]
			},
			{
				property: 'box-shadow',
				value: 'inset 3px 2px 6px, 3px 1px 10px',
				parts: [
					'inset',
					'3px',
					'2px',
					'6px',
					',',
					'3px',
					'1px',
					'10px'
				]
			}
		]
	}
];
