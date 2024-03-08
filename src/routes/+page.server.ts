import type { IShoe } from '$lib/api/useShoes';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

	const response = await fetch(`${supabaseUrl}/rest/v1/shoes?select=*&order=date_added.desc`, {
		headers: {
			apikey: supabaseAnonKey,
			Authorization: `Bearer ${supabaseAnonKey}`,
			Range: '0-19'
		}
	});

	const data: IShoe = await response.json();

	return {
		props: {
			shoes: data
		}
	};
}
