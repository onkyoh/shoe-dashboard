<script lang="ts">
	import NoteContainer from "./NoteContainer.svelte";

    import type { INote } from "$lib/types";
    import type { SubmitFunction } from "@sveltejs/kit";

	import Icon from "$lib/components/ui/icon/Icon.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from '$lib/components/ui/dialog';
    import { Textarea } from "$lib/components/ui/textarea";
    import FormButton from "$lib/components/ui/form/form-button.svelte";

    import {enhance} from "$app/forms";
	import toast from "svelte-french-toast";


    export let note: INote;

    let editDialogOpen = false;
    let deleteDialogOpen = false;
    let currentNote = note;
    let isLoading = false

    const noteAction: SubmitFunction = () => {
        isLoading = true

        return async ({ update, result }) => {
            isLoading = false;
            update();
            if (result.type === 'success' && result.data) {
                editDialogOpen = false;
                toast.success(`Note ${result.data.action} successfully!`);
            } else if (result.type === 'failure' && result.data) {
                toast.error(result.data.error);
            }
        };
    }
</script>

<NoteContainer>
    <div class="flex items-center justify-between">
        <h3>{note.users.name}</h3>
        <div class="flex gap-2 items-center">
            <!-- Edit Dialog -->
            <Dialog.Root bind:open={editDialogOpen}>
                <Button class="size-10" variant="ghost" on:click={() => (editDialogOpen = true)}><Icon icon="lucide:edit" className="text-lg"/></Button>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Edit Note</Dialog.Title>
                    <Dialog.Description>
                      You may edit your note, remember these changes are permanent and visible to all of your group members.
                    </Dialog.Description>
                  </Dialog.Header>
                    <form method="POST" action="?/edit" class="flex flex-col gap-4" use:enhance={noteAction}>
                        <Textarea
                            name="content"
                            class="resize-none"
                            bind:value={currentNote.content}
                        />
                        <span class="ml-auto text-muted-foreground text-sm">{currentNote.content.length} / 1000</span>
                        <input type="hidden" name="note_id" value={note.id} />
                        <FormButton isSubmitting={isLoading}>Update</FormButton>
                    </form>
                    <Button variant="ghost" on:click={() => (editDialogOpen = false)}>Cancel</Button>
                </Dialog.Content>
              </Dialog.Root>
            
              <!-- Delete Dialog -->
              <Dialog.Root bind:open={deleteDialogOpen}>
                <Button variant="ghost" class="size-10" on:click={() => (deleteDialogOpen = true)}><Icon icon="lucide:trash" className="text-lg"/></Button>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Are you sure you want to delete this note?</Dialog.Title>
                    <Dialog.Description>
                      This action cannot be undone. This will permanently delete this note
                      for you and your group members.
                    </Dialog.Description>
                  </Dialog.Header>
                  <form action="?/delete" method="POST" use:enhance={noteAction}>
                    <FormButton variant="destructive" isSubmitting={isLoading}>Delete</FormButton>
                    <input type="hidden" name="note_id" value={note.id} />
                  </form>
                  <Button variant="ghost" on:click={() => (deleteDialogOpen = false)}>Cancel</Button>
                </Dialog.Content>
              </Dialog.Root>
         
        </div>
    </div>
    
    <span class="text-sm text-muted-foreground">{new Date(note.created_at).toLocaleDateString('en-CA')}</span>
    <p>{note.content}</p>
</NoteContainer>