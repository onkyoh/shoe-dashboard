<script lang="ts">
	import SvelteSeo from "svelte-seo";

	import Share from '$lib/components/group/Share.svelte';
	import Create from '$lib/components/group/Create.svelte';
	import Bulletin from '$lib/components/group/Bulletin.svelte';
	import BulletinForm from '$lib/components/group/BulletinForm.svelte';
	import Notes from '$lib/components/group/Notes.svelte';
	import BulletinSort from '$lib/components/group/BulletinSort.svelte';
	import BulletinContainer from '$lib/components/group/BulletinContainer.svelte';

	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import Icon from '$lib/components/ui/icon';

	import type { IBulletin } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let createDialogOpen = false;

	let sortedBulletins: IBulletin[] = data.bulletins;
	$: {
		sortedBulletins = [...data.bulletins];
	}

	function modifyBulletin(bulletins: IBulletin[]) {
		sortedBulletins = bulletins;
	}
</script>

<SvelteSeo
  title="Group | shoez.run"
  description="Create or join a group to organize all of your running shoes insights!"
/>

{#if !data.user}
	<Card.Root>
		<Card.Header>
			<p>Sign in or create an account to start or join a group.</p>
		</Card.Header>
	</Card.Root>
{:else if !data.group}
	<div class="flex h-full w-full items-center justify-center">
		<Create dataForm={data.groupForm} />
	</div>
{:else}
	<div class="flex flex-col gap-2">
		<div class="flex max-h-[600px] gap-2 overflow-hidden">
			<Share
				shareLink={data.shareLink}
				group={data.group}
				user={data.user}
				groupMembers={data.groupMembers}
			/>

			<Notes notes={data.notes} />
		</div>

		<!-- Desktop -->
		<div
			class="hidden grid-cols-1 gap-2 pb-4 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
		>
			<div class="hidden md:block">
				<BulletinContainer>
					<BulletinForm
						dataForm={data.bulletinForm}
						closeDialog={() => (createDialogOpen = false)}
					/>
				</BulletinContainer>
			</div>

			{#if data.bulletins && data.bulletins.length > 0}
				{#each sortedBulletins as bulletin (bulletin.id)}
					<Bulletin {bulletin} />
				{/each}
			{/if}
		</div>

		<!-- Mobile -->

		<BulletinSort bulletins={data.bulletins} modifyBulletins={modifyBulletin} />

		<div class="block md:hidden">
			<Dialog.Root closeOnOutsideClick={false} bind:open={createDialogOpen}>
				<Dialog.Trigger
					class="fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white md:hidden"
					aria-label="create bulletin"
				>
					<Icon icon="typcn:plus" class="text-2xl" />
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Create a Bulletin</Dialog.Title>
						<Dialog.Description
							>Create a new bulletin to share key information with your group.</Dialog.Description
						>
					</Dialog.Header>

					<BulletinForm
						dataForm={data.bulletinForm}
						closeDialog={() => (createDialogOpen = false)}
					/>
				</Dialog.Content>
			</Dialog.Root>

			<Carousel.Root class="w-full">
				<Carousel.Content class="ml-0 gap-2">
					{#each sortedBulletins as bulletin (bulletin.id)}
						<Carousel.Item
							class="2xl:1/5 basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
							><Bulletin {bulletin} />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
			</Carousel.Root>
		</div>
	</div>
{/if}
