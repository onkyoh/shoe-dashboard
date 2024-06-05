<script lang="ts">
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
  
    let email = '';
    let sending = false;
    let success = false;
  
    const handleResetPassword = async () => {
      sending = true;
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${import.meta.env.VITE_BASE_URL}/auth/new-password`
        });
  
        if (error) {
          throw new Error(error.message);
        }
  
        toast.success('Password reset email sent!');
        success = true;
      } catch (err) {
        console.error(err);
        toast.error('Failed to send password reset email'); 
      } finally {
        sending = false;
      }
    };
  </script>

  <SvelteSeo
    title="Reset Password | shoez.run"
    description="Enter your email to get a reset password link for your shoez.run account"
  />
  
  <Card.Root class="max-w-[600px] w-full h-fit">
    {#if success}
      <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Password Reset Link Sent</Card.Title>
        <Card.CardDescription>Check your email for a password reset link. Be sure to check your spam folder.</Card.CardDescription>
      </Card.Header>
    {:else}
      <form method="POST" on:submit|preventDefault={handleResetPassword}>
        <Card.Header class="space-y-1">
          <Card.Title class="text-2xl">Reset Password</Card.Title>
          <Card.CardDescription>Enter your email to receive a password reset link.</Card.CardDescription>
        </Card.Header>
        <Card.Content class="grid gap-4">
          <Separator class="mb-2"/>
          <Label class="capitalize" for="email">Email</Label>
          <Input type="email" id="email" bind:value={email} placeholder="johndoe@email.com" required/>
        </Card.Content>
        <Card.Footer>
          <Button isSubmitting={sending}>
            Send Reset Link
          </Button>
        </Card.Footer>
      </form>
    {/if}
    
  </Card.Root>