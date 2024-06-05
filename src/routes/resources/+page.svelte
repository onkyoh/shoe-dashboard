<script lang="ts">
	  import SvelteSeo from "svelte-seo";

	import type { PageData } from './$types';
	import Article from '$lib/components/resources/Article.svelte';

	export let data: PageData;
</script>

<SvelteSeo
  title="Resources | shoez.run"
  description="A collection of hand-picked resources to freshen up your shoe knowledge. Everything from articles, websites, vidoes, and subreddits."
/>

<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
	{#each data.resources as article}
		<Article {article} />
	{/each}
</div>
