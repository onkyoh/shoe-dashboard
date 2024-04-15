<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	export let state: string[];
	export let all: string[];
	export let name: string;
</script>

<Label class="capitalize">{name}:</Label>
{#each all as item}
	<Button
		type="button"
		variant={state.includes(item) ? 'default' : 'ghost'}
		on:click={() =>
			(state = state.includes(item) ? state.filter((b) => b !== item) : state.concat(item))}
		>{item}</Button
	>
{/each}
<input type="hidden" name={state.length > 0 ? name : ''} bind:value={state} />
