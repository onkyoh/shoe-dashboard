<script lang="ts">
	import type { PageData } from './$types';
	import Article from '$lib/components/resources/Article.svelte';

	export let data: PageData;
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
	{#each data.resources as article}
		<Article {article} />
	{/each}
</div>
