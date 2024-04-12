<script lang="ts">
    import "../app.pcss";
    import { toast, Toaster } from 'svelte-french-toast';
    import Sidebar from './(components)/Sidebar.svelte'
    import { cn } from "$lib/utils"
	import Button from "$lib/components/ui/button/button.svelte";
    import Icon from "$lib/components/ui/icon/Icon.svelte";
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { afterNavigate } from '$app/navigation';

    afterNavigate(() => {
        document.getElementById('main')?.scrollTo(0, 0);
    });

    export let data
    let { supabase } = data
    $: ({ supabase } = data)

    $: if ($page.url.searchParams.has('error_description')) {
    const errorDescription = $page.url.searchParams.get('error_description');

    if (errorDescription) {
       toast.error(decodeURIComponent(errorDescription));
    }
}

   let openNav = false

   const toggleOpenNav = () => {
        openNav = !openNav
    }

    $: $page.url.pathname, openNav = false;

</script>

<Toaster/>
<div class="md:hidden flex items-center w-full h-16 p-2 justify-between border fixed top-0 shadow-sm z-10 bg-white">
    <Button on:click={toggleOpenNav}><Icon icon="material-symbols:menu"/></Button>
    <Icon icon="noto:running-shoe"/>
</div>

<div class="flex md:flex-row bg-slate-100 w-full h-full p-2 gap-2 mt-16 md:mt-0">
    <aside class={cn(
        openNav ? "left-0" : "left-[-300%]", 
        "h-full fixed top-0 z-10 w-[300px]",
        "md:w-[400px] md:left-0 md:relative md:h-[calc(100vh-1rem)]"
    )}>
        <Sidebar/>
    </aside>

    {#if openNav}
        <button type="button" aria-label="close sidebar" in:fade={{ duration: 300 }} class="fixed top-0 left-[300px] md:hidden w-full h-screen bg-black/50 z-20" on:click={toggleOpenNav} on:keydown={toggleOpenNav}></button>
    {/if}

    <main id="main"class="overflow-x-hidden w-full h-[calc(100vh-1rem)] overflow-y-auto">
        <slot/>
    </main>
</div>

<style>
    aside {
        transition: left 0.3s ease-in-out; /* Adjust duration and easing as desired */
    }
</style>