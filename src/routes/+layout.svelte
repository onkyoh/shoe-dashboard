<script lang="ts">
    import "../app.pcss";

    export let data
    let { supabase, user } = data
    $: ({ supabase, user } = data)

    async function signOut() {
        await supabase.auth.signOut();
    }
</script>

<button on:click={signOut}>sign out</button>
<div class="hidden md:block">
    sidebar
</div>
<main class="bg-slate-100 overflow-x-hidden">
    <slot/>
</main>
<div class="md:hidden">bottom nav</div>

