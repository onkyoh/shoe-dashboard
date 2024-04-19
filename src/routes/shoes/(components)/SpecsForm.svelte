<script lang="ts">
    import FilterRange from './FilterRange.svelte';
    import FilterLists from './FilterLists.svelte';
    import { BRANDS, CATEGORIES } from '$lib/constants';

    let brands: string[] = [];
    let categories: string[] = [];

    let weightRange: number[] = [0, 14];
    let heelDropRange: number[] = [0, 12];
</script>


<FilterRange state={weightRange} label="Weight" minParam="minWeight" maxParam="maxWeight" max={14} onChange={(v) => {weightRange = [...v]}} unit=" oz"/>
<FilterRange state={heelDropRange} label="Heel Drop" minParam="minDrop" maxParam="maxDrop" max={12} onChange={(v) => {heelDropRange = [...v]}} unit="mm"/>
<FilterLists state={brands} all={BRANDS} name="brands" />
<FilterLists state={categories} all={CATEGORIES} name="categories" />