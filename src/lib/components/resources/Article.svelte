<script lang="ts">
	import type { IResource } from '$lib/types';
	import { formatCreatedAt } from '$lib/utils';
	import Icon from '$lib/components/ui/icon';

	export let article: IResource;

</script>

{#if article.link}
<a
    href="{article.link}"
    target="_blank"
    rel="noopener noreferrer"
    class="flex h-fit flex-col gap-2 overflow-x-hidden rounded-lg border bg-white p-4 hover:border-primary"
>
    <div class="flex justify-between">
        <h2 class="text-md font-semibold">{article.title}</h2>
        <Icon icon="material-symbols:open-in-new" />
    </div>
    <p class="text-muted-foreground">{article.description}</p>
</a>
{:else}
<a
    href={`/resources/${article.title}`}
    class="flex h-fit flex-col gap-2 overflow-x-hidden rounded-lg border bg-white p-4 hover:border-primary"
>
    <div class="flex justify-between">
        <h2 class="text-md font-semibold">{article.title}</h2>
    </div>
    <div class="flex justify-between text-sm text-muted-foreground">
        <span>Adnan Radwan</span>
        <span>{formatCreatedAt(article.created_at)}</span>
    </div>
    <p class="text-muted-foreground">{article.description}</p>
</a>
{/if}
