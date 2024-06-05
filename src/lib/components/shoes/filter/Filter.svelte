<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import Button from '$lib/components/ui/button/button.svelte';

	import SpecsForm from './SpecsForm.svelte';
	import RunsForm from './RunsForm.svelte';

	let selectedTab = 'shoe details';

	const tabs = ['shoe details', 'run type'];

</script>

<div class="flex flex-col gap-6 h-full">
	<Tabs.Root
		value={selectedTab}
		onValueChange={(v) => {
			if (v) selectedTab = v;
		}}
		class="w-full"
	>
		<Tabs.List class="w-full justify-between">
			{#each tabs as tab}
				<Tabs.Trigger value={tab} class="flex-grow capitalize">{tab}</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root>

	<form method="GET" class="flex flex-col justify-between h-full gap-2">

		<div class="flex flex-col gap-4 pb- overflow-y-auto max-h-[calc(100vh-200px)]">
			{#if selectedTab === 'shoe details'}
				<SpecsForm />
			{:else}
				<RunsForm />
			{/if}
		</div>
		<div class="w-full p-2 px-4 flex flex-col gap-2 bg-white">
			<Button type="submit">Search</Button>
			<Button href="/shoes" variant="ghost">Clear</Button>
		</div>
	</form>
</div>

