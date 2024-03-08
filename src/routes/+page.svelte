<script lang="ts">
    import {getShoes, type IShoe} from "$lib/api/useShoes";
	import Spinner from "$lib/components/ui/spinner/spinner.svelte";
    import IntersectionObserver from 'svelte-intersection-observer';
	import Icon from "$lib/components/ui/icon/Icon.svelte";
  
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
            <div class="flex flex-col shadow-lg bg-primary">
                <img class="sm:h-40 lg:h-52 xl:h-40 2xl:h-52 object-cover bg-white" src={shoe.image} alt={shoe.name}  />
                <div class="flex flex-col bg-primary p-4 text-white">
                    <h3 class="text-lg font-bold">{shoe.name}</h3>
                    <table class="w-full text-center">
                        <thead><tr><td><Icon className="mx-auto" name="weight"/></td><td><Icon className="mx-auto fill-white" name="drop"/></td><td>Category</td></tr></thead>
                        <tbody><tr><td>{shoe.weight} oz.</td><td>{shoe.drop}mm</td><td>{shoe.category}</td></tr></tbody>
                    </table>
                    </div>
                <a class="mt-auto bg-primary p-4 pt-0 text-white" href={`/${shoe.name}`}>Read More</a>
            </div>
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
