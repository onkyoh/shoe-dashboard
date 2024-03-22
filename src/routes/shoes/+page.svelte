<script lang="ts">
    import {getShoes,} from "$lib/api/useShoes";
	import Spinner from "$lib/components/ui/spinner/spinner.svelte";
    import IntersectionObserver from 'svelte-intersection-observer';
	import ShoeCard from "$lib/components/ui/shoe-card/ShoeCard.svelte";
    import type { IShoe } from "$lib/types";
  
    export let data: {
        props: {
            shoes: IShoe[]
        }
    }

    const shoes = getShoes()


    let loadMoreRef: HTMLDivElement | null = null;
        
  </script>
  
  <div class="container max-w-full mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
    {#if $shoes.isLoading}
    Loading...
    {:else if $shoes.error}
        Error: {$shoes.error.message}
    {:else}
        {#each $shoes.data?.pages.flatMap(page => page) || data.props.shoes as shoe}
            <ShoeCard shoe={shoe}/>
        {/each}
    {/if}
    {#if $shoes.hasNextPage && $shoes.data?.pages[0] && $shoes.data?.pages[0].length > 0}
        <IntersectionObserver threshold={1} element={loadMoreRef} on:intersect={(e) => {
            if (!$shoes.isFetching) {
                $shoes.fetchNextPage()
            }
        }}>
            {#if $shoes.isLoading}
                <Spinner className="w-24 h-24 mx-auto"/>
            {:else}
            <p bind:this={loadMoreRef} class="h-48">Down</p>
            <br>
            {/if}
        </IntersectionObserver>
    {/if}


</div>
