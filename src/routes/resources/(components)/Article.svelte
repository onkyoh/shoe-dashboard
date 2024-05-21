<script lang="ts">
    import type { IResource } from '$lib/types';
    import { formatCreatedAt } from '$lib/utils';

    export let article: IResource
</script>

<a href={`/resources/${article.title}`} class="flex flex-col gap-2 overflow-x-hidden bg-white rounded-lg p-4 border-2 hover:border-primary h-fit">
    <h2 class="text-md font-semibold">{article.title}</h2>
    <div class="flex justify-between text-muted-foreground text-sm">
      <span>Adnan Radwan</span>
      <span>{formatCreatedAt(article.created_at)}</span>
    </div>
    <p class="text-muted-foreground">{article.description}</p>
  </a>

