import { supabase } from '$lib/supabaseClient';
import { createInfiniteQuery } from '@tanstack/svelte-query';

export interface IShoe {
	id: string;
	name: string;
	weight?: number;
	drop?: number;
	category?: string;
	image?: string;
	source?: string;
	date_added?: number;
}

const PAGE_SIZE = 20;

const fetchShoes = async ({ pageParam = 1 }): Promise<IShoe[]> => {
	let start = (pageParam - 1) * PAGE_SIZE;
	// For pages after the first, adjust start index to skip over the last item of the previous page.
	if (pageParam > 1) {
		start += 1;
	}
	const end = start + PAGE_SIZE - 1;
	const { data, error } = await supabase
		.from('shoes')
		.select()
		.order('date_added', { ascending: false })
		.range(start, end);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export const getShoes = () => {
	return createInfiniteQuery({
		queryKey: ['shoes'],
		queryFn: ({ pageParam }) => fetchShoes({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const totalShoes = allPages.flatMap((page) => page).length;

			if (totalShoes % PAGE_SIZE === 0 && lastPage.length > 0) {
				return totalShoes / PAGE_SIZE + 1;
			} else {
				return undefined;
			}
		}
	});
};
