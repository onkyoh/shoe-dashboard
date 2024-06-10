<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import Link from '$lib/components/ui/link';
	import { Separator } from '$lib/components/ui/separator';


	function formatTitle(title: string) {
		const location = title.split('/')[1]
		return location.charAt(0).toUpperCase() + location.slice(1);
	}
</script>

<SvelteSeo
	title={`${formatTitle($page.url.pathname)} | shoez.run`}
/>

{#if $page.error}
<div class="h-[calc(100vh-4.5rem)]">
	<Card.Root class="p-2 text-center">
		<Card.Title class="text-4xl">{$page.status || 500}</Card.Title>
		<Separator class="my-4" />
		<Card.Content>
			{$page.error.message || 'An unexpected error occurred. Please try again.'}
			<br />
			{#if $page.error.link}
				<Link href={$page.error.link.href}>
					{$page.error.link.label}
				</Link>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
{/if}
