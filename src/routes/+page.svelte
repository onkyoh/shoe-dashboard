<script lang="ts">
	import type { PageData } from './$types';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import ShoeCard from './shoes/(components)/ShoeCard.svelte';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;

	const { shoes } = data;
</script>

<section class="flex max-h-screen flex-col gap-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>New Shoes</Card.Title>
			<Card.Description
				>An overview of all the latest releases in the running shoe world.</Card.Description
			>
		</Card.Header>
	</Card.Root>

	{#if shoes.length > 0}
		<Carousel.Root class="right-inner-shadow w-full border-l border-r" opts={{ skipSnaps: true }}>
			<Carousel.Content class="ml-0 gap-2">
				{#each shoes as shoe}
					<Carousel.Item class="basis-1/2 p-0 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
						><a href={`/shoes/${shoe.name}`}><ShoeCard {shoe} /></a></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<p>No shoes found</p>
	{/if}

	<Card.Root>
		<Card.Header>
			<Card.Title>Latest Activity</Card.Title>
			<Card.Description>A recap of all of you and your groups most recent updates.</Card.Description
			>
		</Card.Header>
	</Card.Root>
	{#if data.shoes.length > 0}
		<Carousel.Root class="w-full border-l border-r">
			<Carousel.Content class="ml-0 gap-2">
				{#each data.shoes as shoe}
					<Carousel.Item class="basis-1/2 p-0 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
						><ShoeCard {shoe} /></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<p>No activity found</p>
	{/if}

	<Card.Root>
		<Card.Header>
			<Card.Title>Freshen up on your Knowledge</Card.Title>
			<Card.Description
				>Presented here are some of the latest articles, guides and tutorials on all things running
				shoes.</Card.Description
			>
		</Card.Header>
	</Card.Root>
	{#if data.shoes.length > 0}
		<Carousel.Root class="w-full border-l border-r">
			<Carousel.Content class="ml-0 gap-2">
				{#each data.shoes as shoe}
					<Carousel.Item class="basis-1/2 p-0 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
						><ShoeCard {shoe} /></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<p>No resources found</p>
	{/if}
</section>
