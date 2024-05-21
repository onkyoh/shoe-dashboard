import type { Tables } from '$lib/schema';
import { getRangeParams, getFilterParams, getSortParam, getPageParam } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
	const page = getPageParam(url);
	const offset = page * 20;

	const nameSearch = url.searchParams.get('name');

	const query = supabase.from('shoes').select('*', { count: 'exact' });
	if (nameSearch) {
		query.ilike('name', `%${nameSearch}%`);
	} else {
		const weightRange = getRangeParams(url, 'minWeight', 'maxWeight');
		const dropRange = getRangeParams(url, 'minDrop', 'maxDrop');
		const brandSearch = getFilterParams(url, 'brands');
		const categorySearch = getFilterParams(url, 'categories');

		if (weightRange) query.gte('weight', weightRange[0]).lte('weight', weightRange[1]);
		if (dropRange) query.gte('drop', dropRange[0]).lte('drop', dropRange[1]);
		if (brandSearch)
			query.likeAnyOf(
				'name',
				brandSearch.flat().map((brand) => `%${brand}%`)
			);
		if (categorySearch) query.in('category', categorySearch);
	}

	const [sortField, sortOrder] = getSortParam(url);
	query.order(sortField, { ascending: sortOrder === 'asc' });
	query.range(offset, offset + 19);

	const { data: shoes, count } = await query;
	const maxPage = Math.ceil((count || 0) / 20);

	return {
		shoes: (shoes as Tables<'shoes'>[]) || [],
		page,
		count,
		maxPage
	};
};
