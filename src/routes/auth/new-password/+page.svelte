<script>
    import SvelteSeo from "svelte-seo";

    import { Button } from "$lib/components/ui/form";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"
    import { toast } from 'svelte-french-toast'
	  import Separator from "$lib/components/ui/separator/separator.svelte";
  
    export let data
    let { supabase } = data
    $: ({ supabase } = data)

    let newPassword = '';
    let confirmPassword = '';
    let submitting = false;
  
    async function handlePasswordUpdate() {
  
      if (newPassword !== confirmPassword) {
        return toast.error('Passwords do not match.'); 
      }
  
      submitting = true;
      try {
  
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
  
        if (error) {
          throw new Error(error.message || 'Failed to update password');
        }
  
        toast.success('Password updated successfully!');
        window.location.href = '/'; 

      } catch (err) {
        console.error(err);
        toast.error(err?.message || 'Failed to update password'); 
      } finally {
        submitting = false;
      }
    }
  </script>

  
  <SvelteSeo
    title="New Password | shoez.run"
    description="Set a new password for your account on shoez.run"
  />
  
  <Card.Root class="max-w-[600px] w-full h-fit">
    <form method="POST" on:submit|preventDefault={handlePasswordUpdate}>
      <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Set New Password</Card.Title>
        <Card.CardDescription>Please enter then confirm your new password. Ensure it is a strong password which you can remember.</Card.CardDescription>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <Separator class="mb-2"/>
        <Label class="capitalize" for="newPassword">New Password</Label>
        <Input type="password" id="newPassword" bind:value={newPassword} required />
  
        <Label class="capitalize" for="confirmPassword">Confirm Password</Label>
        <Input type="password" id="confirmPassword" bind:value={confirmPassword} required />
      </Card.Content>
      <Card.Footer>
        <Button isSubmitting={submitting}>
          Update Password
        </Button>
      </Card.Footer>
    </form>
  </Card.Root>