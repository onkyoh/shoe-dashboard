<script lang="ts">
    import type { PageData } from './$types';
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import ShoeCard from "./shoes/(components)/ShoeCard.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Card from "$lib/components/ui/card";

    export let data: PageData

    const { shoes } = data
  </script>
   

  <section class="flex flex-col gap-2">

    <Card.Root>
    <Card.Header>
      <Card.Title>New Shoes</Card.Title>
      <Card.Description>An overview of all the latest releases in the running shoe world.</Card.Description>
    </Card.Header>
    <Separator class="mb-4" />
    <Card.Content>
      {#if shoes.length > 0}
      <Carousel.Root class="w-full lg:w-11/12 border-r border-l" >
        <Carousel.Content class="gap-2 ml-0">
            {#each shoes as shoe}
                <Carousel.Item class="p-0 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"><ShoeCard shoe={shoe}/></Carousel.Item>
            {/each}
        </Carousel.Content>
        <Carousel.Next class="hidden lg:flex"/>
      </Carousel.Root>
      {:else}
        <p>No shoes found</p>
      {/if}
    </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header>
        <Card.Title>Latest Activity</Card.Title>
        <Card.Description>A recap of all of you and your groups most recent updates.</Card.Description>
      </Card.Header>
      <Separator class="mb-4" />
      <Card.Content>
        {#if data.shoes.length > 0}
        <Carousel.Root class="w-full lg:w-11/12 border-r border-l" >
          <Carousel.Content class="gap-2 ml-0">
              {#each data.shoes as shoe}
                  <Carousel.Item class="p-0 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"><ShoeCard shoe={shoe}/></Carousel.Item>
              {/each}
          </Carousel.Content>
          <Carousel.Next class="hidden lg:flex"/>
        </Carousel.Root>
        {:else}
          <p>No activity found</p>
        {/if}
      </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Freshen up on your Knowledge</Card.Title>
          <Card.Description>Presented here are some of the latest articles, guides and tutorials on all things running shoes.</Card.Description>
        </Card.Header>
        <Separator class="mb-4" />
        <Card.Content>
          {#if data.shoes.length > 0}
          <Carousel.Root class="w-full lg:w-11/12 border-r border-l" >
            <Carousel.Content class="gap-2 ml-0">
                {#each data.shoes as shoe}
                    <Carousel.Item class="p-0 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"><ShoeCard shoe={shoe}/></Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Next class="hidden lg:flex"/>
          </Carousel.Root>
          {:else}
            <p>No resources found</p>
          {/if}
        </Card.Content>
        </Card.Root>
  
  </section>