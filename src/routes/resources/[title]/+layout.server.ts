import type { Tables } from '$lib/schema';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: LayoutServerLoad = async ({ locals: { supabase }, params }) => {
	const { data: article }: { data: Tables<'resources'> | null } = await supabase
		.from('resources')
		.select('*')
		.eq('title', params.title)
		.single();

	if (!article) {
		error(404, {
			message: 'Article not found',
			link: {
				href: '/resources',
				label: 'Go back to resources'
			}
		});
	}

	return {
		article
	};
};
