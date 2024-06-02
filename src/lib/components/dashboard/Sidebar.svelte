<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Icon from '$lib/components/ui/icon';

	let { user, group } = $page.data;

	const routes = [
		{
			title: 'Dashboard',
			icon: 'mdi:home',
			path: '/'
		},
		{
			title: 'Groups',
			icon: 'mingcute:group-fill',
			path: '/group'
		},
		{
			title: 'Resources',
			icon: 'mdi:newspaper-variant',
			path: '/resources'
		},
		{
			title: 'Shoes',
			path: '/shoes',
			icon: 'mingcute:shoe-fill'
		},
		{
			title: 'Profile',
			isSecondary: true,
			icon: 'iconamoon:profile-fill',
			path: '/profile'
		},
		{
			title: 'Contact',
			isSecondary: true,
			icon: 'ic:baseline-email',
			path: '/contact'
		}
	];

	const variantByPath = (path: string, currentPath: string | null, exclude?: string) => {
		if (currentPath?.includes(path) && (!exclude || !currentPath?.includes(exclude))) {
			if (path === '/' && currentPath !== '/') {
				return false; // Exclude dashboard if not the exact match
			} else {
				return true;
			}
		} else {
			return false; // Default to false if path doesn't match
		}
	};
</script>

<div class="group mr-0 h-full w-full flex-col gap-4 border bg-white py-2 md:rounded-lg">
	<nav class="flex h-full flex-col gap-1 px-2">
		<div>
			{#if user}
				<div class="px-4 py-2">
					<p class="font-semibold">{user?.name || 'Create and Account or Login'}</p>
					{#if group}<p class="text-muted-foreground">{group?.name}</p>{:else}<p
							class="text-muted-foreground"
						>
							Not in a group
						</p>{/if}
				</div>
			{:else}
				<div class="flex gap-2">
					<Button class="flex-grow" href="/auth/login">Login</Button>
					<Button class="flex-grow" href="/auth/register" variant="ghost">Sign Up</Button>
				</div>
			{/if}
			<Separator class="my-2" />
		</div>

		<ul class="flex h-full flex-col gap-1 overflow-y-auto">
			{#each routes.filter((route) => !route.isSecondary) as route}
				<Button
					href={route.path}
					variant={variantByPath(route.path, $page.route.id) ? 'default' : 'ghost'}
					class="text-md w-full justify-start px-4"
				>
					<Icon icon={route.icon} />
					<span class="ml-2 inline">{route.title}</span>
				</Button>
			{/each}
			<Separator class="mb-2 mt-auto" />
			{#each routes.filter((route) => route.isSecondary) as route}
				<Button
					href={route.path}
					variant={variantByPath(route.path, $page.route.id) ? 'default' : 'ghost'}
					class="text-md w-full justify-start px-4"
				>
					<Icon icon={route.icon} />
					<span class="ml-2 inline">{route.title}</span>
				</Button>
			{/each}
		</ul>
	</nav>
</div>
