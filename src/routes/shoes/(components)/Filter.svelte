<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from "$lib/components/ui/tabs";
    import Button from '$lib/components/ui/button/button.svelte';
    import { page } from '$app/stores'

	import SpecsForm from './SpecsForm.svelte';
	import RunsForm from './RunsForm.svelte';

    let selectedTab = 'shoe details';
    let dialogOpen = false

    const tabs = ['shoe details', 'run type']
</script>

<Dialog.Root bind:open={dialogOpen} >
    <Dialog.Trigger class="font-sm rounded-lg border bg-primary px-4 py-2 font-semibold text-white" on:click={() => (dialogOpen = true)}
        >Filter
    </Dialog.Trigger>
    <Dialog.Content class="overflow-y-auto max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] lg:max-w-[500px]">
        <Dialog.Header>
            <Dialog.Title>Filter By:</Dialog.Title>
        </Dialog.Header>

        <Tabs.Root value={selectedTab} onValueChange={(v) => {if (v) selectedTab = v}} class="w-full">
            <Tabs.List class="w-full justify-between">
                {#each tabs as tab}
                    <Tabs.Trigger value={tab} class="capitalize flex-grow">{tab}</Tabs.Trigger>
                {/each}
            </Tabs.List>
            <Tabs.Content value="shoe details" class="text-muted-foreground">Know what type of shoe you want or just want to compare your options? Filter shoes by their specifications.</Tabs.Content>
            <Tabs.Content value="run type" class="text-muted-foreground">Need a shoe to get into running or complete your collection? Filter shoes by your running needs.</Tabs.Content>
        </Tabs.Root>

        <form method="GET" class="flex flex-col gap-6">
            {#if selectedTab === 'shoe details'}
                <SpecsForm />
			{:else}
				<RunsForm/>
			{/if}

            <Button type="submit" on:click={() => (dialogOpen = false)}>Search</Button>
        </form>
    </Dialog.Content>
</Dialog.Root>