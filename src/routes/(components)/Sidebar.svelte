<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Icon from '$lib/components/ui/icon';
	import { BRANDS } from '$lib/constants';
	import Search from '../shoes/(components)/(search)/Search.svelte';

	let { user, group } = $page.data;


	const SHOE_CHILDREN = [
		{
			title: 'All',
			isChild: true,
			path: '/shoes'
		},
		...BRANDS.map((brand) => ({
			title: brand,
			isChild: true,
			path: `/shoes?brands=${brand}`
		}))
	];

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
			icon: 'mingcute:shoe-fill',
			children: SHOE_CHILDREN
		},
		{
			title: 'Profile',
			isSecondary: true,
			icon: 'iconamoon:profile-fill',
			path: '/profile'
		},
	];

	let isExpanded: string[] = [];

	const toggleChildren = (title: string) => {
		isExpanded = isExpanded.includes(title)
			? isExpanded.filter((existing) => existing !== title)
			: [...isExpanded, title];
	};

	// Closes expanded when path changes
	$: {
		const params = $page.url.searchParams;
		isExpanded = [];
	}

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
					<Button class="flex-grow" href="/auth/login">Login</Button><Button
						variant="ghost"
						class="flex-grow"
						href="/auth/register">Sign Up</Button
					>
				</div>
			{/if}
			<Separator class="my-2" />
		</div>

		<ul class="flex h-full flex-col gap-1 overflow-y-auto">
			{#each routes.filter((route) => !route.isSecondary) as route}
				{#if route.children}
					<Button
						on:click={() => toggleChildren(route.title)}
						variant={variantByPath(route.path, $page.route.id) ? 'default' : 'ghost'}
						class="w-full justify-start px-4 py-2 text-sm"
					>
						<Icon icon={route.icon} />
						<span class="ml-2 inline">{route.title}</span>
						{#if isExpanded.includes(route.title)}
							<Icon icon="heroicons-solid:minus" class="ms-auto" />
						{:else}
							<Icon icon="heroicons-solid:plus" class="ms-auto" />
						{/if}
					</Button>
					{#if isExpanded.includes(route.title)}
						{#each route.children as child}
							<Button
								href={child.path}
								variant="ghost"
								class="w-full justify-start px-4 py-2 text-sm"
							>
								<span class="ml-8 inline">{child.title}</span>
							</Button>
						{/each}
					{/if}
				{:else}
					<Button
						href={route.path}
						variant={variantByPath(route.path, $page.route.id) ? 'default' : 'ghost'}
						class="text-md w-full justify-start px-4"
					>
						<Icon icon={route.icon} />
						<span class="ml-2 inline">{route.title}</span>
					</Button>
				{/if}
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
