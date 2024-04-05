<script lang="ts">
    import "../app.pcss";
    import { Toaster } from 'svelte-french-toast';
    import Sidebar from './(components)/Sidebar.svelte'
    import { cn } from "$lib/utils"
	import Button from "$lib/components/ui/button/button.svelte";
    import Icon from "$lib/components/ui/icon/Icon.svelte";
    import { page } from "$app/stores";

    export let data
    let { supabase } = data
    $: ({ supabase } = data)

   let openNav = false

   const toggleOpenNav = () => {
        openNav = !openNav
    }

    $: $page.url.pathname, openNav = false;

</script>

<Toaster/>
<div class="md:hidden flex items-center w-full h-16 p-2 justify-between border fixed top-0 shadow-sm z-10 bg-white">
    <Button on:click={toggleOpenNav}><Icon icon="material-symbols:menu"/></Button>
    <span>Logo</span>
</div>

<div class="flex md:flex-row bg-slate-100 w-full h-screen p-2 gap-2 mt-16 md:mt-0">
    <aside class={cn(openNav ? "left-0" : "left-[-100%]", "h-full w-full md:w-[400px] md:left-0 fixed md:relative z-10 top-0" )}>
        <Sidebar toggleOpenNav={toggleOpenNav} />
    </aside>
    <main class="overflow-x-hidden h-full w-full">
        <slot/>
    </main>
</div>


<style>
    aside {
    transition: left 0.3s ease-in-out; /* Adjust duration and easing as desired */
} 
</style>