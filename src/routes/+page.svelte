<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import type { PageData } from './$types';

	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';

	import ShoeCard from '$lib/components/shoes/ShoeCard.svelte';
	import Acitivty from '$lib/components/dashboard/Acitivty.svelte';
	import Article from '$lib/components/resources/Article.svelte';
	import Link from '$lib/components/ui/link';

	export let data: PageData;

	const { shoes, activity, resources, user } = data;
</script>

<SvelteSeo
	title="Dashboard | shoez.run"
	description="shoez.run provides a convenient location for everything running shoes. Start a group, share your thoughts, and start learning!"
/>

<section class="flex flex-col gap-2">
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
					<Carousel.Item
						class="2xl:1/5 basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						><a href={`/shoes/${shoe.name}`}
							><ShoeCard {shoe} class="border hover:border hover:border-primary" /></a
						></Carousel.Item
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
					<Carousel.Item
						class="2xl:1/5 basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						><Acitivty {activity} /></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<Card.Root>
			<Card.Header class="text-muted-foreground">
				{#if user}
					<p>No activity found</p>
				{:else}
					<p>
						<Link href="/auth/login">Sign in</Link> to start sharing your insights about running shoes.
					</p>
				{/if}
			</Card.Header>
		</Card.Root>
	{/if}

	<Card.Root>
		<Card.Header>
			<Card.Title>Freshen up on your Knowledge</Card.Title>
			<Card.Description
				>Here are some of the latest reviews, articles and videos on all things running shoes.
			</Card.Description>
		</Card.Header>
	</Card.Root>
	{#if resources.length > 0}
		<Carousel.Root class="w-full" opts={{ skipSnaps: true }}>
			<Carousel.Content class="ml-0 gap-2 ">
				{#each resources as article}
					<Carousel.Item
						class="2xl:1/5 basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						><Article {article} /></Carousel.Item
					>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	{:else}
		<p>No resources found</p>
	{/if}
</section>
