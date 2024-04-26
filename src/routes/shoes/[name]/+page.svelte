<script lang="ts">
    
	import type { INote, IShoe } from "$lib/types";
    import type { Infer, SuperValidated } from "sveltekit-superforms";

    import ShoeCard from "../(components)/ShoeCard.svelte";
    import Icon from "$lib/components/ui/icon/Icon.svelte";
    import RSGIcon from '$lib/images/RSG.svelte'; 
    import { Button} from "$lib/components/ui/button";
	import InfoMap from "./(components)/InfoMap.svelte";
	import NoteForm, { noteSchema } from "./(components)/NoteForm.svelte";
    import Note from "./(components)/Note.svelte";
	
    
    export let data: { shoe: IShoe | null, form: SuperValidated<Infer<typeof noteSchema>>, notes: INote[] | []};
   
    let { shoe, form, notes } = data;
    $: ({ shoe, form, notes } = data);

</script>

{#if shoe}
    <section class="flex flex-col gap-2 flex-wrap">
        <div class="flex flex-col lg:flex-row gap-2">
            <div class="flex flex-col gap-2 max-w-[400px] w-full">  
                <ShoeCard shoe={shoe}/>
                {#if shoe.source}
                <Button class="flex gap-2 items-center justify-between w-full" href={shoe.source} target="_blank" rel="noopener noreferrer">
                    <RSGIcon class="w-[100px] ms-auto"/>
                    Review
                    <Icon icon="mdi:open-in-new" className="ms-auto"/>
                </Button>
                {/if}
            </div>

            <InfoMap shoe={shoe}/>
        </div>

    
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:4grid-cols-4 gap-2 pb-4">
            <NoteForm dataForm={form} shoe={shoe}/>

            {#if notes && notes.length > 0}
                {#each notes as note (note.id)}
                    <Note note={note} />
                {/each}
            {/if}

        </div>

    </section>
{/if}
