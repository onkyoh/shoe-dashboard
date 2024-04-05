<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let {supabase, user} = $page.data


    async function signOut() {
        await supabase.auth.signOut();
        goto('/auth/login');
    }
    
</script>

<Button on:click={signOut} class="bg-red-500 hover:bg-red-700">Sign Out</Button>