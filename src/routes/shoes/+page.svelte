<script lang="ts">
    import type { PageData } from "./$types";
    import { cn } from '$lib/utils';

    import Button from "$lib/components/ui/button/button.svelte";
    import { Input } from "$lib/components/ui/input";
    import ShoeCard from "./(components)/ShoeCard.svelte";
    import { press } from 'svelte-gestures';
    
    import { goto } from "$app/navigation";
	import type { IShoe } from "$lib/types";
    import { page } from "$app/stores";
  
    export let data: PageData;


    $: desiredPage = data.page

    $: disablePrev = data.page <= 0; 
    $: disableNext = data.page >= data.maxPage -1;

    const navToPage = () => {
        goto(`/shoes?page=${desiredPage}`)
    }

    let isSelecting = false
    let selected: IShoe[] = []
    
    const handlePress = () => {
        isSelecting = true
    }

    $: $page.url, console.log('Currently selected', selected)

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
  </script>

    <div class="mb-2">
        <!-- this will house the toggle for selecting as well as a several methods of filtration -->
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
        <Button disabled={disablePrev} on:click={() => goto(`/shoes?page=${data.page - 1}`)}>Prev</Button>

        <Input
            type="number"
            class="w-16"
            min="0"
            max={data.maxPage}
            bind:value={desiredPage}
            on:keydown={(event) => event.key === 'Enter' && navToPage()}
        />

        <Button disabled={disableNext} on:click={() => goto(`/shoes?page=${data.page + 1}`)}>Next</Button>
    </div>