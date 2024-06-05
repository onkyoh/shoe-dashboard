import type { IResource } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: resources }: { data: IResource[] | null } = await supabase
		.from('resources')
		.select('title, link, description, created_at, id')
		.order('created_at', { ascending: false });

	return {
		resources: resources || []
	};
};
