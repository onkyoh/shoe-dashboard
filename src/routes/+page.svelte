<script lang="ts">
	import type { IShoe } from "$lib/types";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
	import ShoeCard from "$lib/components/ui/shoe-card/ShoeCard.svelte";

    export let data: {
        props: {
            shoes: IShoe[]
        }
    }

  </script>
   

  <section class="flex flex-col p-2">

    {#if  data.props.shoes.length == 0}

    <p>No shoes found</p>

    {/if}
   

  <Carousel.Root class="w-full lg:w-11/12" >
    <Carousel.Content class="gap-2 ml-0">
        {#each data.props.shoes as shoe}
            <Carousel.Item class="p-0 basis-1/2 sm:basis-1/3 xl:basis-1/5"><ShoeCard shoe={shoe}/></Carousel.Item>
        {/each}
    </Carousel.Content>
    <Carousel.Next />
  </Carousel.Root>

</section>