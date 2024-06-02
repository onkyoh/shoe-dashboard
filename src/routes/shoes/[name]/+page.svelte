<script lang="ts">
	import ShoeCard from '$lib/components/shoes/ShoeCard.svelte';
	import Icon from '$lib/components/ui/icon';
	import RSGIcon from '$lib/images/RSG.svelte';
	import { Button } from '$lib/components/ui/button';

	import InfoMap from '$lib/components/shoes/shoe/InfoMap.svelte';
	import NoteForm from '$lib/components/shoes/shoe/NoteForm.svelte';
	import Note from '$lib/components/shoes/shoe/Note.svelte';
	import NoteContainer from '$lib/components/shoes/shoe/NoteContainer.svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import * as Carousel from '$lib/components/ui/carousel';

	export let data;

	let { shoe, form, notes, user } = data;
	$: ({ shoe, form, notes, user } = data);

	let createDialogOpen = false;
</script>

{#if shoe}
	<section class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 lg:flex-row">
			<div class="flex w-full max-w-[400px] flex-col gap-2">
				<ShoeCard {shoe} />
				{#if shoe.source}
					<Button
						class="flex w-full items-center justify-between gap-2"
						href={shoe.source}
						target="_blank"
						rel="noopener noreferrer"
					>
						<RSGIcon class="ms-auto w-[100px]" />
						Review
						<Icon icon="mdi:open-in-new" class="ms-auto" />
					</Button>
				{/if}
			</div>

			<InfoMap {shoe} />
		</div>

		{#if user}
			<!-- Mobile -->
			<div class="block md:hidden">
				<Dialog.Root closeOnOutsideClick={false} bind:open={createDialogOpen}>
					<Dialog.Trigger
						class="fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white md:hidden"
						><Icon icon="typcn:plus" class="text-2xl" /></Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Create a Note</Dialog.Title>
							<Dialog.Description
								>Create a new note to share key insights about this shoe.</Dialog.Description
							>
						</Dialog.Header>

						<NoteForm dataForm={form} {shoe} closeDialog={() => (createDialogOpen = false)} />
					</Dialog.Content>
				</Dialog.Root>

				<Carousel.Root class="w-full">
					<Carousel.Content class="ml-0 gap-2">
						{#if notes && notes.length > 0}
							{#each notes as note (note.id)}
								<Carousel.Item
									class="2xl:1/5 basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
									><Note {note} /></Carousel.Item
								>
							{/each}
						{/if}
					</Carousel.Content>
				</Carousel.Root>
			</div>

			<!-- Desktop -->
			<div
				class="hidden grid-cols-1 gap-2 pb-4 md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
			>
				<div class="hidden md:block">
					<NoteContainer>
						<NoteForm dataForm={form} {shoe} closeDialog={() => (createDialogOpen = false)} />
					</NoteContainer>
				</div>

				{#if notes && notes.length > 0}
					{#each notes as note (note.id)}
						<Note {note} />
					{/each}
				{/if}
			</div>
		{/if}
	</section>
{/if}
