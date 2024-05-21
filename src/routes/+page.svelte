<script lang="ts">
	import type { PageData } from './$types';

	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Card from '$lib/components/ui/card';

	import ShoeCard from './shoes/(components)/ShoeCard.svelte';
	import Acitivty from './(components)/Acitivty.svelte';
	import Article from './resources/(components)/Article.svelte';

	export let data: PageData;

	const { shoes, activity, resources, user } = data;
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
	<Carousel.Root class="w-full" opts={{ skipSnaps: true }}>
		<Carousel.Content class="ml-0 gap-2 ">
			{#each shoes as shoe}
				<Carousel.Item class="basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
					><a href={`/shoes/${shoe.name}`}><ShoeCard {shoe} class="border-2 hover:border-primary hover:border-2"/></a></Carousel.Item
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
	{#if activity.length > 0}
		<Carousel.Root class="w-full" opts={{ skipSnaps: true }}>
			<Carousel.Content class="ml-0 gap-2">
				{#each activity as activity}
					<Carousel.Item class="basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
						><Acitivty {activity} /></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
	<Card.Root>
		<Card.Header>
			{#if user}
			<p>No activity found</p>
			{:else}
			<p>Sign in to start creating and sharing your insights about running shoes.</p>
			{/if}
		</Card.Header>
	</Card.Root>
	{/if}

	<Card.Root>
		<Card.Header>
			<Card.Title>Freshen up on your Knowledge</Card.Title>
			<Card.Description
				>Here are some of the latest articles, guides and tutorials on all things running
				shoes.
			</Card.Description
			>
		</Card.Header>
	</Card.Root>
	{#if resources.length > 0}
		<Carousel.Root class="w-full border-l border-r" opts={{ skipSnaps: true }}>
			<Carousel.Content class="ml-0 gap-2">
				{#each resources as article}
					<Carousel.Item class="basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
						><Article {article}/></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<p>No resources found</p>
	{/if}
</section>
