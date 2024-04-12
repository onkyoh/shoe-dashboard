<script lang="ts">
    import type { PageData } from "./$types";

    import { cn } from '$lib/utils';
    import { press } from 'svelte-gestures';

    import Button from "$lib/components/ui/button/button.svelte";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Switch } from "$lib/components/ui/switch";
    import ShoeCard from "./(components)/ShoeCard.svelte";
    import Icon from "$lib/components/ui/icon/Icon.svelte";

    import Filter from "./(components)/Filter.svelte";
    
    import { goto } from "$app/navigation";
	import type { IShoe } from "$lib/types";
	import Sort from "./(components)/Sort.svelte";

  
    export let data: PageData;

    $: desiredPage = data.page
    $: maxPage = Math.ceil((data.count || 0) / 20);

    $: disablePrev = data.page <= 0; 
    $: disableNext = data.page >= maxPage -1;

    const navToPage = () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // Set the page query parameter
        params.set('page', desiredPage.toString());

        // Navigate using SvelteKit's goto
        goto(`${url.pathname}?${params}`);
    }

    let isSelecting = false
    let selected: IShoe[] = []
    
    const handlePress = () => {
        isSelecting = true
    }

    const handleSelected = (shoe: IShoe, event: Event) => {

        if (isSelecting) {
            event.preventDefault()
            if (selected.includes(shoe)) {
                selected = selected.filter((s) => s !== shoe)
            } else {
                selected = [...selected, shoe]
            }
        }
    }

    function handlePage(pageNumber: number) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // Set the page query parameter
        params.set('page', pageNumber.toString());

        // Navigate using SvelteKit's goto
        goto(`${url.pathname}?${params}`);
    }

  </script>

    <div class="bg-white p-6 border shadow-sm rounded-lg mb-2 flex items-center flex-wrap gap-4">
        <!-- Filter -->
        <Filter/>
        <!-- Search -->
        <form method="GET" class="w-fit md:w-[400px] flex items-center gap-2">   
            <Input type="search" placeholder="Search" name="name" />
            <Button type="submit" class="text-white"><Icon icon="ph:magnifying-glass"/></Button>
        </form>
        <!-- Sort -->
       <Sort/>
        <!-- Inventory -->
        <div class="flex gap-2 items-center 2xl:ml-auto">
            <Label for="switch">In Store</Label>
            <Switch />
            <Label for="switch">Adding to Inventory</Label>
            <Switch />
        </div>
    
    </div>
    
    {#if data.shoes.length === 0}
        <p class="px-4 py-2 border shadow-sm rounded-md bg-white w-fit mx-auto">No shoes found</p>
    {:else}
    <div class="max-w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {#each data.shoes as shoe (shoe.id)}
            <a 
            href={`/shoes/${shoe.id}?state=${JSON.stringify(shoe)}`} 
            use:press={{timeframe: 300, triggerBeforeFinished: true}} 
            on:press={handlePress} 
            on:click={(event) => handleSelected(shoe, event)}
            class={cn("rounded-md", selected.includes(shoe) ? 'ring-2 ring-primary/50' : '')}
            >   
                <ShoeCard shoe={shoe} />
            </a>
        {/each}
    </div>
    {/if}

    <div class="flex justify-center items-center gap-2 mt-2 pb-2 md:pb-0">
        <span>Showing: {data.shoes.length} of {data.count || 0}</span>
        <Button disabled={disablePrev} on:click={() => handlePage(data.page - 1)}>Prev</Button>

        <Input
            type="number"
            class="w-16"
            min="0"
            max={maxPage}
            bind:value={desiredPage}
            on:keydown={(event) => event.key === 'Enter' && navToPage()}
        />

        <Button disabled={disableNext} on:click={() => handlePage(data.page + 1)}>Next</Button>
    </div>