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
    let searchTerm = '';
    let focused = false;  // Track focus state

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
        return name.replace(regex, (match) => `<b>${match}</b>`);
    }
    function onFocus() {
		setTimeout(() => {
			focused = true;
		}, 200)
    }

    function onBlur() {
		setTimeout(() => {
			focused = false;
		}, 200)
    }

</script>

<form
    method="GET"
    action="/shoes"
    class={cn('relative', className)}
    on:submit={() => (results = null)}
>
    <div class="relative flex items-center gap-2">
        <SearchInput
            type="search"
            placeholder="Search"
            name="name"
            autocomplete="off"
            on:input={handleSearch}
            on:focus={onFocus}
            on:blur={onBlur}
        />
        <Button type="submit"><Icon icon="material-symbols:search" /></Button>
    </div>

    <!-- Conditionally render results based on focus state -->
    {#if results && focused}
        <div class="absolute top-12 z-10 w-full rounded-md border bg-white">
            {#if results.length > 0}
                <ul class="flex max-h-60 flex-col gap-0 overflow-y-auto">
                    {#each results as shoe, i}
                        <li class="hover:bg-gray-100">
                            <a
                                href={`/shoes/${shoe.name}`}
                                class="block overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2"
                                on:click={() => (results = null)}
                            >
                                {@html highlightMatches(shoe.name)}
                            </a>
                            {#if i < results.length - 1}
                                <Separator />
                            {/if}
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="px-4 py-2 text-center text-sm text-muted-foreground">No shoes found.</p>
            {/if}
        </div>
    {/if}
</form>
