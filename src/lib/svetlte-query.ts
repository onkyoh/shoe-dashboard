import { QueryClient } from '@tanstack/svelte-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 5 * 60 * 1000
		}
	}
});

export { queryClient };
