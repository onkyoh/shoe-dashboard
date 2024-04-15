<script lang="ts">
	import type { PageData } from './$types';

	import { cn } from '$lib/utils';
	import { press } from 'svelte-gestures';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import ShoeCard from './(components)/ShoeCard.svelte';
	import Icon from '$lib/components/ui/icon/Icon.svelte';
	import Filter from './(components)/Filter.svelte';

	import { addSearchParam } from '$lib/utils';
	import type { IShoe } from '$lib/types';
	import Sort from './(components)/Sort.svelte';

	export let data: PageData;

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

<div class="mb-2 flex flex-wrap items-center gap-4 rounded-lg border bg-white p-6 shadow-sm">
	<!-- Filter -->
	<Filter />
	<!-- Search -->
	<form method="GET" class="flex w-fit items-center gap-2 md:w-[400px]">
		<Input type="search" placeholder="Search" name="name" />
		<Button type="submit" class="text-white"><Icon icon="ph:magnifying-glass" /></Button>
	</form>
	<!-- Sort -->
	<Sort />
	<!-- Inventory -->
	<div class="flex items-center gap-2 2xl:ml-auto">
		<Label for="switch">In Store</Label>
		<Switch />
		<Label for="switch">Adding to Inventory</Label>
		<Switch />
	</div>
</div>

{#if data.shoes.length === 0}
	<p class="mx-auto w-fit rounded-md border bg-white px-4 py-2 shadow-sm">No shoes found</p>
{:else}
	<div
		class="grid max-w-full grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
	>
		{#each data.shoes as shoe (shoe.id)}
			<a
				href={`/shoes/${shoe.id}?state=${JSON.stringify(shoe)}`}
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

<div class="mt-2 flex items-center justify-center gap-2 pb-2 md:pb-0">
	<span>Showing: {data.shoes.length} of {data.count || 0}</span>
	<Button disabled={disablePrev} on:click={() => addSearchParam('page', data.page - 1)}>Prev</Button
	>

	<Input
		type="number"
		class="w-16"
		min="0"
		max={maxPage}
		bind:value={desiredPage}
		on:keydown={(event) => event.key === 'Enter' && addSearchParam('page', desiredPage)}
	/>

	<Button disabled={disableNext} on:click={() => addSearchParam('page', data.page + 1)}>Next</Button
	>
</div>
