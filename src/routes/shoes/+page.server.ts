import type { IShoe } from '$lib/types.js';
import { getFilterParams, getSortParam } from '$lib/utils';

export async function load({ locals, url }) {
	const { supabase } = locals;

	let page = +(url.searchParams.get('page') || '0');
	page = Math.max(0, page);
	if (isNaN(page)) {
		page = 0;
	}
	const floor = page * 20;
	const ceil = floor + 19;

	const weightRange = getFilterParams(url, 'weight');
	const maxDrop = getFilterParams(url, 'maxDrop');
	const nameSearch = url.searchParams.get('name');
	const brandSearch = getFilterParams(url, 'brands');
	const sort = getSortParam(url);

	const query = supabase.from('shoes').select('*', { count: 'exact' });

	if (weightRange) {
		query.gte('weight', weightRange[0]).lte('weight', weightRange[1]);
	}
	if (maxDrop) {
		query.lte('drop', maxDrop);
	}
	if (nameSearch) {
		query.ilike('name', `%${nameSearch}%`);
	}
	if (brandSearch) {
		query.likeAnyOf(
			'name',
			brandSearch[0].split(',').map((brand) => `%${brand}%`)
		);
	}

	// Apply sorting
	const sortField = sort.startsWith('-') ? sort.slice(1) : sort;
	const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
	query.order(sortField, { ascending: sortOrder === 'asc' });
	query.range(floor, ceil);

	const { data: shoes, count, error } = await query;
	const maxPage = Math.ceil((count || 0) / 20);

	if (page > maxPage) {
		return {
			shoes: [] as IShoe[],
			page,
			count
		};
	}

	return {
		shoes: shoes || ([] as IShoe[]),
		page,
		count
	};
}
