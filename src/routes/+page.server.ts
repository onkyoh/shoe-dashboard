import type { PageServerLoad } from './$types';
import type { IShoe } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, safeGetSession } = locals;

	const { data: shoes, error } = await supabase
		.from('shoes')
		.select('*')
		.order('created_at', { ascending: false })
		.range(0, 9);

	if (error) {
		return { shoes: [] };
	}

	return {
		shoes: shoes as IShoe[]
	};
};
