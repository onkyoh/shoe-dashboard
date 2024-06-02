<script lang="ts">
	import type { IResource } from '$lib/types';
	import { formatCreatedAt } from '$lib/utils';

	export let article: IResource;
</script>

<a
	href={`/resources/${article.title}`}
	class="flex h-fit flex-col gap-2 overflow-x-hidden rounded-lg border bg-white p-4 hover:border-primary"
>
	<h2 class="text-md font-semibold">{article.title}</h2>
	<div class="flex justify-between text-sm text-muted-foreground">
		<span>Adnan Radwan</span>
		<span>{formatCreatedAt(article.created_at)}</span>
	</div>
	<p class="text-muted-foreground">{article.description}</p>
</a>
