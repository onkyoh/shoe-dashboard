import type { RunMap } from './types';

export const SORT_OPTIONS = [
	{ value: 'date|asc', label: 'Release Date (Low to High)' },
	{ value: 'date|desc', label: 'Release Date (High to Low)' },
	{ value: 'drop|asc', label: 'Heel Drop (Low to High)' },
	{ value: 'drop|desc', label: 'Heel Drop (High to Low)' },
	{ value: 'weight|asc', label: 'Weight (Low to High)' },
	{ value: 'weight|desc', label: 'Weight (High to Low)' }
];
export const RUNS: RunMap[] = [
	{
		label: 'Race',
		specs: [
			{
				name: 'categories',
				value: ['Racing']
			}
		]
	},
	{
		label: 'Tempo',
		specs: [
			{
				name: 'categories',
				value: ['Lightweight', 'Racing']
			},
			{
				name: 'maxWeight',
				value: 9.5
			}
		]
	},
	{
		label: 'Daily',
		specs: [
			{
				name: 'categories',
				value: ['Cushioning']
			},
			{
				name: 'minWeight',
				value: 7
			},
			{
				name: 'maxWeight',
				value: 10
			}
		]
	},
	{
		label: 'Easy',
		specs: [
			{
				name: 'categories',
				value: ['Cushioning']
			},
			{
				name: 'minWeight',
				value: 10
			}
		]
	},
	{
		label: 'Long',
		specs: [
			{
				name: 'categories',
				value: ['Racing', 'Cushioning', 'Lightweight']
			},
			{
				name: 'maxWeight',
				value: 9
			}
		]
	}
];

export const STABLE_RUNS: RunMap[] = [
	{
		label: 'Race',
		specs: [
			{
				name: 'categories',
				value: ['Racing']
			}
		]
	},
	{
		label: 'Tempo',
		specs: [
			{
				name: 'categories',
				value: ['Racing']
			},
			{
				name: 'maxWeight',
				value: 9.5
			}
		]
	},
	{
		label: 'Daily',
		specs: [
			{
				name: 'categories',
				value: ['Stability']
			},
			{
				name: 'minWeight',
				value: 7
			},
			{
				name: 'maxWeight',
				value: 10
			}
		]
	},
	{
		label: 'Easy',
		specs: [
			{
				name: 'categories',
				value: ['Stability']
			},
			{
				name: 'minWeight',
				value: 10
			}
		]
	},
	{
		label: 'Long',
		specs: [
			{
				name: 'categories',
				value: ['Racing', 'Stability']
			},
			{
				name: 'maxWeight',
				value: 9
			}
		]
	}
];

export const PRONATION: RunMap[] = [
	{
		label: 'Overpronation',
		specs: [
			{
				name: 'categories',
				value: ['Stability']
			}
		]
	},
	{
		label: 'Neutral',
		specs: [
			{
				name: 'categories',
				value: ['Cushioning']
			}
		]
	},
	{
		label: 'Underpronation',
		specs: [
			{
				name: 'categories',
				value: ['Cushioning']
			}
		]
	}
];
