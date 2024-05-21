import type { RunMap } from '$lib/types';

export const BRANDS = [
	'Adidas',
	'Asics',
	'Brooks',
	'Hoka',
	'New Balance',
	'Nike',
	'ON',
	'Puma',
	'Saucony'
];

export const CATEGORIES = ['Cushioning', 'Lightweight', 'Racing', 'Stability', 'Trail', 'Training'];

export const PRIORITY_MAP: Record<number, string> = {
	1: 'bg-green-400',
	2: 'bg-amber-300',
	3: 'bg-red-400'
};

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

export const SPEC_DESCRIPTIONS = {
	category: {
		Racing:
			'Race shoes prioritize speed and energy return. Common features include carbon plates, superfoams, and minimal uppers and outsoles. In return, you get a lightweight shoe that delivers the best performance possible on race day. These shoes can also be used for Tempo and Long runs; however, their longevity will suffer.',
		Lightweight:
			'Lightweight shoes prioritize minimizing weight to enable you to run fast. While sometimes containing plates and superfoams, these shoes are distinct from racers as they generally have better longevity and lack the necessary amounts of foam needed for long runs. These shoes are best suited for your Interval workouts, Fartleks, and Threshold runs.',
		Cushioning:
			'Cushioning shoes include your daily trainers and max cushion shoes. These shoes are meant to handle the bulk of your miles. From outsole, midsole, to upper, they prioritize comfort and durability, rather than performance and speed.',
		Stability:
			'Stability shoes provide a supportive ride for runners who overpronate. This support typically comes from a wider base and a firmer foam. These shoes are meant to handle the bulk of your miles. From outsole, midsole, to upper, they prioritize comfort and durability, rather than performance and speed.',
		Trail:
			'Trail runners have three key distinctions from regular running shoes. The outsole always has tread to provide grip; the midsole is relatively firmer for increased stability on more aggressive terrain, and the upper is made from more durable materials for durability and protect your feet. For runs on gravel to runs on mountains, trail runners are the optimal choice.',
		Training:
			'Training shoes are a versatile option for non-running workouts. Whether it’s weight-lifting, cross-fit, or any other gym activity, these shoes provide the stability, base, and comfort you need.'
	},
	drop: {
		'0-6':
			'This shoe has a low heel-to-toe drop and is ideal for runners who strike with their forefoot.',
		'7-9': 'This shoe has a moderate heel-to-toe drop, making it ideal for midfoot strikers.',
		'10-12':
			'This shoe has a high heel-to-toe drop, which is ideal for heel strikers as the relatively large offset will promote a forward roll.'
	},
	weight: {
		'under 8':
			'This shoe is exceptionally lightweight, which makes it more suitable for faster workouts.',
		'8-10':
			'The weight of this shoe indicates it is not intended to be the fastest shoe, nor provide maximal comfort and protection.',
		'10 and over':
			'This shoe is relatively heavy and likely has added elements to enhance comfort, with a durable midsole that emphasizes protecting your legs and keeping them fresh.'
	}
};

export const EXPIRY_MAP: Record<string, number> = {
	Day: 1000 * 60 * 60 * 24,
	Week: 1000 * 60 * 60 * 24 * 7,
	Month: 1000 * 60 * 60 * 24 * 30,
	Never: 1000 * 60 * 60 * 24 * 30 * 12 * 5
};
