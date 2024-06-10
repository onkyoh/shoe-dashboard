<script lang="ts">
	import '../app.pcss';

	import { cn } from '$lib/utils';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';

	import { toast, Toaster } from 'svelte-french-toast';

	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon';

	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
	import SearchDialog from '$lib/components/dashboard/SearchDialog.svelte';
	import Search from '$lib/components/shoes/search/Search.svelte';

	// Reset scroll on page change
	afterNavigate(() => {
		document.getElementById('main')?.scrollTo(0, 0);
	});

	// Handles OAuth errors
	$: if ($page.url.searchParams.has('error_description')) {
		const errorDescription = $page.url.searchParams.get('error_description');
		if (errorDescription) {
			toast.error(decodeURIComponent(errorDescription));
		}
	}

	let openNav = false;
	const toggleOpenNav = () => {
		openNav = !openNav;
	};
	$: $page.url.pathname, (openNav = false);
</script>

<Toaster />

<header class="fixed z-10 w-full rounded-md border bg-white p-2 md:relative">
	<div class="mx-auto flex w-full items-center justify-between md:px-4">
		<Button on:click={toggleOpenNav} variant="ghost" class="md:hidden" aria-label="open sidebar">
			<Icon icon="material-symbols:menu" class="text-primary" />
		</Button>
		<a href="/" class="text-2xl font-semibold italic text-primary" style="font-family: Arial"
			>shoez.run</a
		>
		<Search class="hidden md:block md:w-[400px]" />
		<SearchDialog />
		<!-- Span to center search on md: -->
		<span class="invisible hidden text-2xl font-semibold italic md:block">shoez.run</span>
	</div>
</header>

<div class="flex h-full w-full bg-slate-100 md:h-[calc(100vh-3.7rem)] md:flex-row">
	<aside
		class={cn(
			openNav ? 'left-0' : 'left-[-300%]',
			'fixed top-0 z-10 h-full w-[300px]',
			'md:relative md:left-0 md:w-[400px] md:p-2 md:pr-0'
		)}
	>
		<Sidebar />
	</aside>

	{#if openNav}
		<button
			aria-label="close sidebar"
			in:fade={{ duration: 300 }}
			class="fixed inset-0 left-[300px] top-0 z-50 h-screen w-full md:hidden"
			on:click={toggleOpenNav}
			on:keydown={toggleOpenNav}
		></button>
	{/if}

	<main class="min-h-[calc(100%] mt-14 h-full w-full overflow-y-auto p-2 md:mt-0">
		<slot />
	</main>
</div>

<style>
	aside {
		transition: left 0.3s ease-in-out;
	}
</style>
