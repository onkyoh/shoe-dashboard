<script lang="ts">
	import { addSearchParam, cn } from "$lib/utils";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";

	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	import ShoeCard from "$lib/components/shoes/ShoeCard.svelte";
	import Sort from "$lib/components/shoes/sort/Sort.svelte";
	import Search from "$lib/components/shoes/search/Search.svelte";
	import MobileSort from "$lib/components/shoes/sort/MobileSort.svelte";
	import Filter from "$lib/components/shoes/filter/Filter.svelte";

	import type { PageData } from "./$types";


	export let data: PageData;

	$: desiredPage = data.page;
	$: maxPage = Math.ceil((data.count || 0) / 20);

	$: disablePrev = data.page <= 0;
	$: disableNext = data.page >= maxPage - 1;

	$: floor = data.shoes.length * (data.page) + 1
	$: ciel = data.page * 20 + data.shoes.length


	let mobileFilterOpen = false
	const toggleMobileFilter = () => {
		mobileFilterOpen = !mobileFilterOpen
	}
	$: $page.url.pathname, (mobileFilterOpen = false);

</script>

<section class="flex flex-col gap-2">
	<div class="md:hidden">
		<Button class="w-full" on:click={toggleMobileFilter}>Filter & Sort</Button>
	</div>
	<div class="hidden md:flex justify-between">
		<Search class="w-[400px]"/>
		<Sort />
	</div>
	<div class="flex gap-2">

	<div class="overflow-y-auto h-full md:w-[calc(100%-300px)]">


		<!-- Shoe Grid -->
		{#if data.shoes.length === 0}
			<p class="mx-auto w-fit rounded-md border bg-white p-4 py-2 shadow-sm">No shoes found</p>
		{:else}
			<div
				class="grid max-w-full grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
			>
				{#each data.shoes as shoe (shoe.id)}
					<a
						href={`/shoes/${shoe.name}`}
					>
						<ShoeCard {shoe} class="border-2 hover:border-primary"/>
					</a>
				{/each}
			</div>
		{/if}

		<!-- Pagination -->

		<div class="mt-2 flex items-center justify-center gap-2">
			<span>{floor} to {ciel} of {data.count || 0}</span>
			<Button disabled={disablePrev} on:click={() => addSearchParam('page', data.page - 1)}
				>Prev</Button
			>

			<Input
				type="number"
				class="w-16"
				min="0"
				max={maxPage}
				bind:value={desiredPage}
				on:keydown={(event) => event.key === 'Enter' && addSearchParam('page', desiredPage)}
			/>

			<Button disabled={disableNext} on:click={() => addSearchParam('page', data.page + 1)}
				>Next</Button
			>
		</div>
	</div>

	<!-- Filter Sidebar -->
	<aside
		class={cn(
			mobileFilterOpen ? 'right-0' : 'right-[-300%]',
			'fixed top-0 z-30 w-[300px] bg-white p-6 border rounded-md h-full',
			'md:relative md:block md:right-0'
		)}
	>	
		<MobileSort/>
		<Filter/>
	</aside>

	{#if mobileFilterOpen}
		<button
			aria-label="close filter sidebar"
			in:fade={{ duration: 300 }}
			class="fixed inset-0 right-[300px] left-0 top-0 z-20 h-screen w-full md:hidden"
			on:click={toggleMobileFilter}
			on:keydown={toggleMobileFilter}
		></button>
	{/if}

</section>


<style>
	aside {
		transition: right 0.3s ease-in-out; 
	}
</style>


