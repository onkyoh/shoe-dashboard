<script lang="ts">
	import type { PageData } from './$types';
    import Article from "./(components)/Article.svelte";

    export let data: PageData

    let tempResources = Array(5).fill(data.resources[0])
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each tempResources as article}
        <Article {article} />
    {/each}
</div>