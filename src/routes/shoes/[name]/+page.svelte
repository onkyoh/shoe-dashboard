<script lang="ts">
    import ShoeCard from "$lib/components/shoes/ShoeCard.svelte";
    import Icon from "$lib/components/ui/icon";
    import RSGIcon from '$lib/images/RSG.svelte'; 
    import { Button} from "$lib/components/ui/button";

	import InfoMap from "$lib/components/shoes/shoe/InfoMap.svelte";
	import NoteForm from "$lib/components/shoes/shoe/NoteForm.svelte";
    import Note from "$lib/components/shoes/shoe/Note.svelte";
    import NoteContainer from "$lib/components/shoes/shoe/NoteContainer.svelte";

    import * as Dialog from '$lib/components/ui/dialog';
    import * as Carousel from '$lib/components/ui/carousel';
    
    export let data;
   
    let { shoe, form, notes, user } = data;
    $: ({ shoe, form, notes, user} = data);

    let createDialogOpen = false

</script>

{#if shoe}
    <section class="flex flex-col gap-2">
        <div class="flex flex-col lg:flex-row gap-2">
            <div class="flex flex-col gap-2 max-w-[400px] w-full">  
                <ShoeCard shoe={shoe}/>
                {#if shoe.source}
                <Button class="flex gap-2 items-center justify-between w-full" href={shoe.source} target="_blank" rel="noopener noreferrer">
                    <RSGIcon class="w-[100px] ms-auto"/>
                    Review
                    <Icon icon="mdi:open-in-new" class="ms-auto"/>
                </Button>
                {/if}
            </div>

            <InfoMap shoe={shoe}/>
        </div>

        {#if user}
            <!-- Mobile -->
            <div class="block md:hidden">
                <Dialog.Root bind:open={createDialogOpen}>
                    <Dialog.Trigger class="md:hidden text-white rounded-lg w-12 h-12 bg-primary flex justify-center items-center fixed right-4 bottom-4 z-10"><Icon icon="typcn:plus" class="text-2xl" /></Dialog.Trigger>
                    <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Create a Note</Dialog.Title>
                        <Dialog.Description>Create a new note to share key information with your group.</Dialog.Description>
                    </Dialog.Header>
                
                    <NoteForm dataForm={form} shoe={shoe} closeDialog={() => (createDialogOpen = false)}/>
                    </Dialog.Content>
                </Dialog.Root>

                <Carousel.Root class="w-full">
                    <Carousel.Content class="ml-0 gap-2">
                        {#if notes && notes.length > 0}
                            {#each notes as note (note.id)}
                                <Carousel.Item class="basis-3/4 p-0 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:1/5"
                                    ><Note note={note} /></Carousel.Item
                                >
                            {/each}
                        {/if}
                    </Carousel.Content>
                </Carousel.Root>
            </div>
        
            <!-- Desktop -->
            <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 pb-4">
                <div class="hidden md:block">
                    <NoteContainer >
                        <NoteForm dataForm={form} shoe={shoe} closeDialog={() => (createDialogOpen = false)}/>
                    </NoteContainer>
                </div>

                {#if notes && notes.length > 0}
                    {#each notes as note (note.id)}
                        <Note note={note}  />
                    {/each}
                {/if}
            </div>
        {/if}

    </section>
{/if}
