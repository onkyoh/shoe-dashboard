<script lang="ts">
    import SvelteSeo from "svelte-seo";

    import { page } from "$app/stores";

    import * as Card from '$lib/components/ui/card';    
	import { Separator } from "$lib/components/ui/separator";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";
    import Icon from "$lib/components/ui/icon";

	import LeaveDialog from "$lib/components/group/LeaveDialog.svelte";

    let {supabase, user, group} = $page.data


    async function signOut() {
        await supabase.auth.signOut();
        window.location.href = '/'
    }
    
</script>

<SvelteSeo
  title="Profile | shoez.run"
  description="View and edit shoez.run profile information"
  noindex={true}
/>


<div class="w-full h-full flex justify-center items-center">
    <Card.Root class="w-full max-w-[600px]">
        <Card.Header>
            <Card.Title class="text-2xl">Profile</Card.Title>
            <Card.Description>View and edit your profile</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-2">
            <Separator class="mb-4"/>

            <Label>Email</Label>
            <div class="flex justify-between items-center mb-2">
                <p class="text-muted-foreground">{user?.email}</p>
            </div>

            <Label>Name</Label>
            <div class="flex justify-between items-center mb-2">
                <p class="text-muted-foreground">{user?.name}</p>
            </div>
          
    
            <Label>Password</Label>
            <div class="flex justify-between items-center mb-2">
                <p class="text-muted-foreground">*********</p>
                <Button variant="outline" size="sm" href="/auth/new-password"><Icon icon="material-symbols:edit-sharp" class="text-lg"/></Button>
            </div>
          
    
            <Label>Group</Label>
            <div class="flex justify-between items-center mb-2">
                <p class="text-muted-foreground">{group?.name || 'N/A'}</p>
                {#if group?.id}<LeaveDialog />{/if}
            </div>
          
            <Button on:click={signOut} variant="destructive">Sign Out</Button>
    </Card.Content>
    </Card.Root>
</div>

