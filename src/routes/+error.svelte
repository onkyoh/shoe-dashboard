<script lang="ts">
    import { page } from '$app/stores';
    import * as Card from '$lib/components/ui/card';
	import Link from '$lib/components/ui/link/Link.svelte';
    import { Separator } from '$lib/components/ui/separator';
</script>

{#if $page.error}
    <Card.Root class="p-2 text-center">
        <Card.Title class="text-4xl">{$page.status}</Card.Title>
        <Separator class="my-4" />
        <Card.Content>{$page.error.message || "An unexpected error occurred. Please try again."}</Card.Content>

        {#if $page.error.link}
            <Link href={$page.error.link.href}>
                {$page.error.link.label}
            </Link>
        {/if}
    </Card.Root>
{/if}