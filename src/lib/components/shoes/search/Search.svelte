<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import SearchInput from './SearchInput.svelte';
    import { Separator } from '$lib/components/ui/separator';
    import Icon from '$lib/components/ui/icon';

    import { page } from '$app/stores';
    import { cn } from '$lib/utils';

    export { className as class };

    let className = '';
    let supabase = $page.data.supabase;

    let currentTimeout: NodeJS.Timeout | null = null;
    let results: { name: string }[] | null = null;
    let searchTerm = "";

    async function handleSearch(event: any) {
        const target = event.target;
        if (target && 'value' in target) {
            searchTerm = target.value.toLowerCase();
            if (searchTerm.length > 0) {
                if (currentTimeout) {
                    clearTimeout(currentTimeout);
                }
                currentTimeout = setTimeout(async () => {
                    const { data } = await supabase
                        .from('shoes')
                        .select('name')
                        .ilike('name', `%${searchTerm}%`)
                        .order('created_at', { ascending: false })
                        .limit(5);
                    results = data || [];
                }, 300);
            } else {
                results = null;
            }
        }
    }
	
	function highlightMatches(name: string) {
        const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearchTerm, 'gi');
        return name.replace(regex, match => `<b>${match}</b>`);
    }


</script>



<form method="GET" action="/shoes" class={cn("relative", className)} on:submit={() => results=null}>
    <div class="flex relative items-center gap-2">
        <SearchInput
            type="search"
            placeholder="Search"
            name="name"
            autocomplete="off"
            on:input={handleSearch}
        />
        <Button type="submit"><Icon icon="tabler:search" /></Button>
    </div>

    {#if results}
		<div class="absolute w-full bg-white rounded-md border top-12">
			{#if results.length > 0}
				<ul class="flex max-h-60 flex-col gap-0 overflow-y-auto">
					{#each results as shoe, i}
						<li class="hover:bg-gray-100">
							<a
								href={`/shoes/${shoe.name}`}
								class="block py-2 px-4 overflow-hidden text-ellipsis whitespace-nowrap"
								on:click={() => results = null}
							>
								{@html highlightMatches(shoe.name)}
							</a>
							{#if i < results.length - 1}
								<Separator/>
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