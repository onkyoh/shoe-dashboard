<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { formatCreatedAt } from '$lib/utils';

	import NoteContainer from './NoteContainer.svelte';
	import Icon from '$lib/components/ui/icon';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';
	import FormButton from '$lib/components/ui/form/form-button.svelte';

	import type { INote } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let note: INote;

	let editDialogOpen = false;
	let deleteDialogOpen = false;
	let currentNote = note;
	let isLoading = false;

	const noteAction: SubmitFunction = () => {
		isLoading = true;

		return async ({ update, result }) => {
			isLoading = false;
			if (result.type === 'success' && result.data) {
				editDialogOpen = false;
				deleteDialogOpen = false;
				await update();
				toast.success(`Note ${result.data.action} successfully!`);
			} else if (result.type === 'failure' && result.data) {
				toast.error(result.data.message);
			}
		};
	};
</script>

<NoteContainer>
	<div class="flex items-center justify-end">
		<div class="mr-[-1rem] flex items-center gap-2">
			<!-- Edit Dialog -->
			<Dialog.Root closeOnOutsideClick={false} bind:open={editDialogOpen}>
				<Button class="size-10" variant="ghost" on:click={() => (editDialogOpen = true)}
					><Icon icon="lucide:edit" class="text-lg" /></Button
				>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Edit Note</Dialog.Title>
						<Dialog.Description>
							You may edit your note, remember these changes are permanent and visible to all of
							your group members.
						</Dialog.Description>
					</Dialog.Header>
					<form method="POST" action="?/edit" class="flex flex-col gap-4" use:enhance={noteAction}>
						<Textarea name="content" class="resize-none p-4" bind:value={currentNote.content} />
						<span class="ml-auto text-sm text-muted-foreground"
							>{currentNote.content.length} / 1000</span
						>
						<input type="hidden" name="note_id" value={note.id} />
						<FormButton
							isSubmitting={isLoading}
							disabled={isLoading || currentNote.content.length === 0}>Update</FormButton
						>
					</form>
				</Dialog.Content>
			</Dialog.Root>

			<!-- Delete Dialog -->
			<Dialog.Root closeOnOutsideClick={false} bind:open={deleteDialogOpen}>
				<Button variant="ghost" class="size-10" on:click={() => (deleteDialogOpen = true)}
					><Icon icon="lucide:trash" class="text-lg" /></Button
				>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Are you sure you want to delete this note?</Dialog.Title>
						<Dialog.Description>
							This action cannot be undone. This will permanently delete this note for you and your
							group members.
						</Dialog.Description>
					</Dialog.Header>
					<form action="?/delete" method="POST" use:enhance={noteAction}>
						<FormButton variant="destructive" isSubmitting={isLoading} disabled={isLoading}
							>Delete</FormButton
						>
						<input type="hidden" name="note_id" value={note.id} />
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>

	<div class="flex justify-between">
		<span class="text-sm text-muted-foreground">
			{note.users.name}
		</span>

		<span class="text-sm text-muted-foreground">
			{formatCreatedAt(note.created_at)}
		</span>
	</div>
	<p class="text-muted-foreground">{note.content}</p>
</NoteContainer>
