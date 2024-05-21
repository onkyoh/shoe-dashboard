<script lang="ts">
	import '../app.pcss';

	import { cn } from '$lib/utils';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';

	import { toast, Toaster } from 'svelte-french-toast';

	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon';

	import Sidebar from './(components)/Sidebar.svelte';
	import SearchDialog from './(components)/SearchDialog.svelte';


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
<div
	class="fixed top-0 z-10 flex h-16 w-full items-center justify-between border bg-white p-2 md:hidden"
>
	<Button on:click={toggleOpenNav} variant="ghost" ><Icon icon="material-symbols:menu" class="text-primary" /></Button>
	<SearchDialog />
</div>

<div class="flex h-full w-full gap-2 bg-slate-100 p-2 md:mt-0 md:flex-row">
	<aside
		class={cn(
			openNav ? 'left-0' : 'left-[-300%]',
			'fixed top-0 z-10 h-full w-[300px]',
			'md:relative md:left-0 md:h-[calc(100vh-1rem)] md:w-[400px]'
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

	<main
		id="main"
		class="h-[calc(100vh-1rem)] w-full overflow-y-auto pt-16 md:pb-0 md:pt-0"
	>
		<slot />
	</main>
</div>

<style>
	aside {
		transition: left 0.3s ease-in-out; 
	}
</style>
