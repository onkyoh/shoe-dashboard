<script lang="ts">
	import type { PageData } from './$types';
	import type { IShoe } from '$lib/types';

	import { cn, addSearchParam } from '$lib/utils';
	import { press } from 'svelte-gestures';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import ShoeCard from './(components)/ShoeCard.svelte';
	import Filter from './(components)/(filter)/Filter.svelte';
	import Sort from './(components)/Sort.svelte';
	import Search from './(components)/Search.svelte';

	export let data: PageData;
	let { supabase } = data;

	$: desiredPage = data.page;
	$: maxPage = Math.ceil((data.count || 0) / 20);

	$: disablePrev = data.page <= 0;
	$: disableNext = data.page >= maxPage - 1;

	let isSelecting = false;
	let selected: IShoe[] = [];

	const handlePress = () => {
		isSelecting = true;
	};

	const handleSelected = (shoe: IShoe, event: Event) => {
		if (isSelecting) {
			event.preventDefault();
			if (selected.includes(shoe)) {
				selected = selected.filter((s) => s !== shoe);
			} else {
				selected = [...selected, shoe];
			}
		}
	};
</script>

<div class="mb-2 hidden items-center justify-between gap-2 rounded-lg border bg-white p-6 md:flex">
	<!-- Filter -->
	<Filter />
	<!-- Search -->
	<Search {supabase} />
	<!-- Sort -->
	<Sort />
</div>

<div class="mb-2 grid grid-cols-1 grid-rows-2 gap-2 rounded-lg border bg-white p-6 md:hidden">
	<!-- Search -->
	<Search {supabase} className="row-span-1 col-span-2 w-full" />
	<!-- Filter -->
	<Filter />
	<!-- Sort -->
	<Sort />
</div>

<div class="h-[calc(100%-10rem)] overflow-auto md:h-[calc(100%-7rem)]">
	{#if data.shoes.length === 0}
		<p class="mx-auto w-fit rounded-md border bg-white px-4 py-2 shadow-sm">No shoes found</p>
	{:else}
		<div
			class="grid max-w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each data.shoes as shoe (shoe.id)}
				<a
					href={`/shoes/${shoe.name}`}
					use:press={{ timeframe: 300, triggerBeforeFinished: true }}
					on:press={handlePress}
					on:click={(event) => handleSelected(shoe, event)}
					class={cn('rounded-md', selected.includes(shoe) ? 'ring-2 ring-primary/50' : '')}
				>
					<ShoeCard {shoe} />
				</a>
			{/each}
		</div>
	{/if}

	<div class="mt-2 flex items-center justify-center gap-2">
		<span>Showing: {data.shoes.length} of {data.count || 0}</span>
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
