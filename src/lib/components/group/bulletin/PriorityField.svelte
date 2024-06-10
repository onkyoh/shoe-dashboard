<script lang="ts">
	import { PRIORITY_MAP } from '$lib/constants';
	import { Button } from '$lib/components/ui/button';

	export let value;
	export let onUpdate: (priority: number) => void;
	export let priorities = [1, 2, 3];
</script>

<div class="flex flex-wrap gap-2">
	{#each priorities as priority}
		<Button
			variant={value === priority ? 'outline' : 'default'}
			class={`border-primary ${PRIORITY_MAP[priority]} flex-grow`}
			on:click={() => onUpdate(priority)}
		></Button>
	{/each}
</div>
