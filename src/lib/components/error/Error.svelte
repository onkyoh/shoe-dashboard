<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
</script>

{#if $page.error}
	<Card.Root class="p-2 text-center">
		<Card.Title class="text-4xl">{$page.status}</Card.Title>
		<Separator class="my-4" />
		<Card.Content>{$page.error.message}</Card.Content>
	</Card.Root>
{/if}
