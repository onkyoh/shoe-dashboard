import type { IShoe } from '$lib/types.js';

export async function load({ locals, url }) {
	const { supabase } = locals;

	let page = +(url.searchParams.get('page') || '0');

	// Ensure page is not negative, setting to 0 if it is
	page = Math.max(0, page);

	// Validate that page is indeed a number after conversion
	if (isNaN(page)) {
		page = 0;
		// Potentially you could return a 400 error or handle this differently
	}

	// not handling case where page is greater than maxPage

	const floor = page * 20;
	const ceil = floor + 19;

	const {
		data: shoes,
		count,
		error
	} = await supabase
		.from('shoes')
		.select('*', { count: 'exact' })
		.order('date_added', { ascending: false })
		.range(floor, ceil);

	const maxPage = Math.ceil((count || 0) / 20);

	if (page > maxPage) {
		return {
			shoes: [],
			page,
			maxPage
		};
	}

	return {
		shoes: shoes as IShoe[],
		page,
		maxPage
	};
}
