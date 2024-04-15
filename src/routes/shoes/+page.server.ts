import type { IShoe } from '$lib/types.js';
import { getFilterParams, getRangeParams, getSortParam, getPageParam } from '$lib/utils';

export async function load({ locals, url }) {
	const { supabase } = locals;

	const page = getPageParam(url);
	const floor = page * 20;
	const ceil = floor + 19;

	const nameSearch = url.searchParams.get('name');
	const weightRange = getRangeParams(url, 'minWeight', 'maxWeight');
	const dropRange = getRangeParams(url, 'minDrop', 'maxDrop');

	const brandSearch = getFilterParams(url, 'brands');
	const categorySearch = getFilterParams(url, 'categories');
	const [sortField, sortOrder] = getSortParam(url);

	const query = supabase.from('shoes').select('*', { count: 'exact' });

	if (weightRange) {
		query.gte('weight', weightRange[0]).lte('weight', weightRange[1]);
	}
	if (dropRange) {
		query.gte('drop', dropRange[0]).lte('drop', dropRange[1]);
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
	console.log(categorySearch);
	if (categorySearch) {
		query.in('category', categorySearch);
	}

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
