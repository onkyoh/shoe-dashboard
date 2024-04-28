<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Icon from '$lib/components/ui/icon/Icon.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { cn } from '$lib/utils';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let className: string | undefined = '';

	let currentTimeout: NodeJS.Timeout | null = null;
	let results: { name: string }[] | null = null;

	// JavaScript-friendly event handling without TypeScript type assertion
	async function handleSearch(event: any) {
		const target = event.target; // No type assertion
		if (target && 'value' in target) {
			const name = target.value;
			if (name.length > 0) {
				if (currentTimeout) {
					clearTimeout(currentTimeout);
				}

				currentTimeout = setTimeout(async () => {
					const { data } = await supabase
						.from('shoes')
						.select('name')
						.ilike('name', `%${name}%`)
						.order('created_at', { ascending: false })
						.limit(5);

					results = data || []; // Update the results state
				}, 300);
			} else {
				results = null; // Clear results on an empty search
			}
		}
	}
</script>

<form method="GET" class={cn('relative flex w-fit items-center gap-2 md:w-[400px]', className)}>
	<Input
		type="search"
		placeholder="Search"
		name="name"
		autocomplete="off"
		on:input={handleSearch}
	/>
	<Button type="submit" class="text-white"><Icon icon="ph:magnifying-glass" /></Button>

	{#if results}
		<div
			class="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-lg border bg-white px-4 py-2 shadow-sm"
		>
			{#if results.length > 0}
				<ul class="flex max-h-60 flex-col gap-2 overflow-y-auto">
					{#each results as shoe, i}
						<li class="flex flex-col gap-2">
							<a
								href={`/shoes/${shoe.name}`}
								class="block overflow-hidden text-ellipsis whitespace-nowrap"
							>
								{shoe.name}
							</a>
							{#if i < results.length - 1}
								<Separator />
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-center text-sm text-muted-foreground">No shoes found.</p>
			{/if}
		</div>
	{/if}
</form>
