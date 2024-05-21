import type { LayoutLoad } from './$types';
import type { Database } from '$lib/schema';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient<Database>(
		import.meta.env.VITE_PUBLIC_SUPABASE_URL,
		import.meta.env.VITE_PUBLIC_SUPABASE_KEY,
		{
			global: {
				fetch
			},
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return JSON.stringify(data.session);
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			}
		}
	);

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session, user: data.user, group: data.group };
};
