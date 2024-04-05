<script lang="ts">
	import type { IShoe } from "$lib/types";
    import ShoeCard from "../(components)/ShoeCard.svelte";
    import { onMount } from 'svelte';
    export let shoe: IShoe | null = null;

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const shoeState = params.get('state');
        if (shoeState) {
        shoe = JSON.parse(decodeURIComponent(shoeState));
        }
    });
</script>
{#if shoe}
<section class="flex flex-col md:flex-row">
    <ShoeCard shoe={shoe} className="w-full max-w-[400px]"/>
</section>
{/if}