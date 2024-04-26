<script lang="ts">
	import FilterRange from './FilterRange.svelte';
	import FilterLists from './FilterLists.svelte';
	import { BRANDS, CATEGORIES } from '$lib/constants';
	import { page } from '$app/stores';

	let brands: string[] = [];
	let categories: string[] = [];
	let weightRange: number[] = [0, 14];
	let heelDropRange: number[] = [0, 12];

	// Initialize state from page store on mount
	$: if ($page.url.searchParams.has('state')) {
		const storedState = JSON.parse($page.url.searchParams.get('state') || '');
		brands = storedState.brands || [];
		categories = storedState.categories || [];
		weightRange = storedState.weightRange || [0, 14];
		heelDropRange = storedState.heelDropRange || [0, 12];
	}

	$: state = JSON.stringify({
		brands,
		categories,
		weightRange,
		heelDropRange
	});

	function updateCategories(newCategories: string[]) {
		categories = newCategories;
	}

	function updateBrands(newBrands: string[]) {
		brands = newBrands;
	}
</script>

<FilterRange
	state={weightRange}
	label="Weight"
	minParam="minWeight"
	maxParam="maxWeight"
	max={14}
	onChange={(v) => {
		weightRange = [...v];
	}}
	unit=" oz"
/>
<FilterRange
	state={heelDropRange}
	label="Heel Drop"
	minParam="minDrop"
	maxParam="maxDrop"
	max={12}
	onChange={(v) => {
		heelDropRange = [...v];
	}}
	unit="mm"
/>
<FilterLists state={brands} all={BRANDS} name="brands" updateState={updateBrands} />
<FilterLists state={categories} all={CATEGORIES} name="categories" updateState={updateCategories} />

<input type="hidden" name="state" bind:value={state} />
