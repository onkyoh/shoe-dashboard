<script lang="ts">
    import type { INote } from '$lib/types';
    import Acitivty from '../../(components)/Acitivty.svelte';
    export let notes: INote[]
</script>

{#if notes && notes.length > 0}
    <div class="w-full hidden lg:flex lg:flex-col xl:grid xl:grid-cols-2 gap-2 overflow-y-auto">
        {#each notes as note}
            <div><Acitivty activity={note} /></div>
        {/each}
    </div>
{/if}