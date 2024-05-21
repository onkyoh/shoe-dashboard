<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { RunMap } from '$lib/types';

	export let state: RunMap | null;
	export let all: RunMap[];
	export let label: string;
	export let updateState: (newState: RunMap | null) => void;

	function handleClick(item: RunMap) {
		updateState(state?.label === item.label ? null : item);
	}
</script>

<Label class="capitalize">{label}:</Label>
<ul class="flex flex-wrap gap-2">
	{#each all as item}
		<li>
			<Button
				type="button"
				variant={state?.label === item.label ? 'default' : 'ghost'}
				class="border capitalize"
				on:click={() => handleClick(item)}
			>
				{item.label}
			</Button>
		</li>
	{/each}
</ul>
{#if state}
	{#each state.specs as input}
		<input type="hidden" name={input.name} bind:value={input.value} />
	{/each}
{/if}
