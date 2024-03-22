import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, getSession } = locals;

	const session = await getSession();

	const { data: shoes, error } = await supabase
		.from('shoes')
		.select('*')
		.order('date_added', { ascending: false })
		.range(0, 9);

	if (error) {
		return { props: { shoes: [] } };
	}

	return {
		props: {
			shoes
		}
	};
};
