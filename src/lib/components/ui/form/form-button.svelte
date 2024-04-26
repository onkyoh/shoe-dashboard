<script lang="ts">
    import * as Button from "$lib/components/ui/button/index.js";
    import Spinner from "$lib/components/ui/spinner/spinner.svelte";

    export let isSubmitting: boolean = false;

    type $$Props = Button.Props & { isSubmitting?: boolean };
    type $$Events = Button.Events;
</script>

<Button.Root type="submit" class="w-full" on:click on:keydown disabled={isSubmitting} {...$$restProps}>
    {#if isSubmitting}
        <Spinner className="text-white mr-2"/> 
	{/if}
    <slot /> <!-- Default slot content when not submitting -->
    
</Button.Root>
