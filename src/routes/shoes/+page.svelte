<script lang="ts">
	 import SvelteSeo from "svelte-seo";

	import { addSearchParam, cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import Icon from '$lib/components/ui/icon';
	import ShoeCard from '$lib/components/shoes/ShoeCard.svelte';
	import Sort from '$lib/components/shoes/sort/Sort.svelte';
	import Filter from '$lib/components/shoes/filter/Filter.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: desiredPage = data.page;
	$: maxPage = Math.ceil((data.count || 0) / 20);

	$: disablePrev = data.page <= 0;
	$: disableNext = data.page >= maxPage - 1;

	$: floor = data.shoes.length * data.page + 1;
	$: ciel = data.page * 20 + data.shoes.length;

	let mobileFilterOpen = false;
	const toggleMobileFilter = () => {
		mobileFilterOpen = !mobileFilterOpen;
	};
	$: $page.url.pathname, (mobileFilterOpen = false);
</script>

<SvelteSeo
  title="Shoes | shoez.run"
  description="A complete collection of modern running shoes, curated for you and your group. Filter shoes based on brands, specs, or even what runs they are good for."
/>

<section class="flex flex-col gap-2">
	<div class="flex gap-2 md:hidden">
		<Sort />
		<Button on:click={toggleMobileFilter}><Icon icon="mage:filter" /></Button>
	</div>

	<div class="flex gap-2">
		<div class="h-full w-full flex flex-col items-center overflow-y-auto md:w-[calc(100%-300px)]">
			<!-- Shoe Grid -->
			{#if data.shoes.length === 0}
				<p class="w-fit rounded-md border bg-white p-4 py-2">No shoes found</p>
			{:else}
				<div
					class="grid max-w-full grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
				>
					{#each data.shoes as shoe (shoe.id)}
						<a href={`/shoes/${shoe.name}`}>
							<ShoeCard {shoe} class="border hover:border-primary" />
						</a>
					{/each}
				</div>
			{/if}

			<!-- Pagination -->

			<div class="mt-2 flex items-center justify-center gap-2">
				<span>{floor}-{ciel} of {data.count || 0}</span>
				<Button disabled={disablePrev} on:click={() => goto(addSearchParam('page', data.page - 1))}
					>Prev</Button
				>

				<Input
					type="number"
					class="w-16"
					min="0"
					max={maxPage}
					bind:value={desiredPage}
					on:keydown={(event) => event.key === 'Enter' && goto(addSearchParam('page', desiredPage))}
				/>

				<Button disabled={disableNext} on:click={() => goto(addSearchParam('page', data.page + 1))}
					>Next
				</Button>
			</div>
		</div>

		<!-- Filter Sidebar -->
		<aside
			class={cn(
				mobileFilterOpen ? 'right-0' : 'right-[-300%]',
				'fixed top-0 z-30 h-full w-[300px] rounded-md border bg-white p-6',
				'md:relative md:right-0 md:block'
			)}
		>
			<Filter />
		</aside>

		{#if mobileFilterOpen}
			<button
				aria-label="close filter sidebar"
				in:fade={{ duration: 300 }}
				class="fixed inset-0 left-0 right-[300px] top-0 z-20 h-screen w-full md:hidden"
				on:click={toggleMobileFilter}
				on:keydown={toggleMobileFilter}
			></button>
		{/if}
	</div>
</section>

<style>
	aside {
		transition: right 0.3s ease-in-out;
	}
</style>
