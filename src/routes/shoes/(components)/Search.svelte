<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import Icon from '$lib/components/ui/icon/Icon.svelte';

    export let supabase;
    let currentTimeout;
    let results = null

    async function handleSearch(name) {
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
            results = null // Clear results on an empty search
        }
    }
</script>

<form method="GET" class="flex w-fit items-center gap-2 md:w-[400px] relative">
    <Input type="search" placeholder="Search" name="name" on:input={async (event) => await handleSearch(event.target.value)} />
    <Button type="submit" class="text-white"><Icon icon="ph:magnifying-glass" /></Button>

    {#if results && results.length > 0}
        <div class="absolute top-full left-0 w-full overflow-hidden z-10"> 
            <ul class="shadow bg-white rounded-md mt-1 overflow-y-auto max-h-60"> 
                {#each results as shoe}
                <a href={`/shoes/${shoe.name}`} class="block text-ellipsis overflow-hidden whitespace-nowrap">
                    {shoe.name}
                </a>
                {/each}
            </ul>
        </div>
    {:else if results !== null}
        <p class="text-sm text-gray-500 absolute top-full left-0 px-4 py-2 mt-1">No shoes found.</p>
    {/if}
</form>