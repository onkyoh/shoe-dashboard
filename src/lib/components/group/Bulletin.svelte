<script lang="ts">
	import { cn, formatCreatedAt, formatName } from '$lib/utils';

    import * as Dialog from '$lib/components/ui/dialog';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Button} from '$lib/components/ui/button'
    import FormButton from '$lib/components/ui/form/form-button.svelte';
    import Icon from '$lib/components/ui/icon';

    import BulletinContainer from './BulletinContainer.svelte';

    import type { IBulletin } from '$lib/types';
    import type { SubmitFunction } from '@sveltejs/kit';

    import { enhance } from '$app/forms';
    import { toast } from 'svelte-french-toast';

    import { PRIORITY_MAP } from '$lib/constants';
    import { EXPIRY_MAP } from '$lib/constants';


    export let bulletin: IBulletin;
    
    let currentBulletin = {
        priority: bulletin.priority,
        expiryDate: determineExpiryDate(),
        content: bulletin.content,
    }

    function determineExpiryDate(): number {
        const deleteAt = new Date(bulletin.delete_at).getTime();
        const createdAt = new Date(bulletin?.created_at || 0).getTime();
        const diff = deleteAt - createdAt;
        if (diff < EXPIRY_MAP['Day']) {
            return EXPIRY_MAP['Day'];
        } else if (diff < EXPIRY_MAP['Week']) {
            return EXPIRY_MAP['Week'];
        } else if (diff < EXPIRY_MAP['Month']) {
            return EXPIRY_MAP['Month'];
        } else {
            return EXPIRY_MAP['Never'];
        }
    }



    let editDialogOpen = false;
    let deleteDialogOpen = false;
    let isLoading = false;
    
    const bulletinAction: SubmitFunction = () => {
		isLoading = true;
		return async ({ result, update }) => {
			isLoading = false;
			if (result.type === 'success' && result.data) {
				editDialogOpen = false;
                deleteDialogOpen = false;
                await update()
				toast.success(`Bulletin ${result.data.action} successfully!`);
			} else if (result.type === 'failure' && result.data) {
				toast.error(result.data.message);
			}
		};
	};
    
</script>


<BulletinContainer>
    <div class="w-full flex justify-end items-center relative">
        
        <span class={cn("absolute left-[-15%] top-[-1.5rem] h-8 w-[130%]", PRIORITY_MAP[currentBulletin.priority])}></span>
        <div class="mt-4 mr-[-1rem] flex">
            <!-- Edit Dialog -->
            <Dialog.Root bind:open={editDialogOpen}>
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
        
                    <form method="POST" action="?/editBulletin" class="flex flex-col gap-4" use:enhance={bulletinAction}>
                        <input type="hidden" name="expiryDate" value={currentBulletin.expiryDate}>
                        <input type="hidden" name="priority" value={currentBulletin.priority}>
                        <div class="flex gap-2 flex-wrap">
                            {#each [1, 2, 3] as priorityLevel}
                                <Button
                                    variant={currentBulletin.priority === priorityLevel ? 'outline' : 'default'}
                                    class={`border-primary ${PRIORITY_MAP[priorityLevel]} flex-grow`}
                                    on:click={() => (currentBulletin.priority = priorityLevel)}
                        
                                >
                                </Button>
                            {/each}
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            {#each Object.keys(EXPIRY_MAP) as expiresIn}
                                <Button
                                    variant={currentBulletin.expiryDate === EXPIRY_MAP[expiresIn] ? 'default' : 'outline'}
                                    on:click={() => (currentBulletin.expiryDate = EXPIRY_MAP[expiresIn])}
                        
                                >
                                    {expiresIn}
                                </Button>
                            {/each}
                        </div>
                        <Textarea name="content" class="resize-none p-4" bind:value={currentBulletin.content}/>
                        <span class="ml-auto text-sm text-muted-foreground"
                            >{currentBulletin.content.length} / 1000</span
                        >
                        <input type="hidden" name="bulletin_id" value={bulletin.id} />
                        <FormButton isSubmitting={isLoading} disabled={currentBulletin.content.length === 0 || isLoading}>Update</FormButton>
                    </form>
                </Dialog.Content>
            </Dialog.Root>

            <!-- Delete Dialog -->
            <Dialog.Root bind:open={deleteDialogOpen}>
                <Button variant="ghost" class="size-10" on:click={() => (deleteDialogOpen = true)}
                    ><Icon icon="lucide:trash" class="text-lg" /></Button
                >
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Are you sure you want to delete this bulletin?</Dialog.Title>
                        <Dialog.Description>
                            This action cannot be undone. This will permanently delete this bulletin for you and your
                            group members.
                        </Dialog.Description>
                    </Dialog.Header>
                    <form action="?/deleteBulletin" method="POST" use:enhance={bulletinAction}>
                        <FormButton variant="destructive" isSubmitting={isLoading} disabled={isLoading}>Delete</FormButton>
                        <input type="hidden" name="bulletin_id" value={bulletin.id} />
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </div>
    <div class="flex justify-between">
        <span class="text-sm text-muted-foreground">{formatName(bulletin.users.name)}</span> 
        <span class="text-sm text-muted-foreground">
            {formatCreatedAt(bulletin.created_at)}
        </span>
    </div>
    <p class="text-muted-foreground"> 
        {bulletin.content}
    </p>
</BulletinContainer>