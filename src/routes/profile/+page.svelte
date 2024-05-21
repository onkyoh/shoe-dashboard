<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { page } from "$app/stores";
	import { browser } from "$app/environment";

    let {supabase} = $page.data


    async function signOut() {
        await supabase.auth.signOut();
        if (browser) {
            window.location.href = '/'
        }
    }
    
</script>

<Button on:click={signOut} class="bg-red-500 hover:bg-red-700">Sign Out</Button>