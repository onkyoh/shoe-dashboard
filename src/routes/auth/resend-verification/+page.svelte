<script>
  import SvelteSeo from "svelte-seo";

  import {Button} from '$lib/components/ui/form'
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

  
    async function handleResend() {
      sending = true;

      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: import.meta.env.VITE_BASE_URL
          }
        });
  
        if (error) {
          throw new Error(error.message);
        };
        
        toast.success('Verification email sent!');
        success = true;
    
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Error sending verification email')
      } finally {
        sending = false;
      }
    }
  </script>

  <SvelteSeo
    title="Resend Verification Email | shoez.run"
    description="Resend verification email to your account on shoez.run"
  />
  
  <Card.Root class="max-w-[600px] w-full h-fit">
    {#if success}
      <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Verification Email Sent</Card.Title>
        <Card.CardDescription>Check your email for a verification link. Be sure to check your spam folder.</Card.CardDescription>
      </Card.Header>
    {:else}
    <form method="POST" on:submit|preventDefault={handleResend} > 
      <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Request Verification Email</Card.Title>
        <Card.CardDescription>Enter your email, if an account exists we will send you a verification email.</Card.CardDescription>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <Separator class="mb-2"/>
        <Label class="capitalize" for="email">Email</Label>
        <Input type="email" id="email" bind:value={email} placeholder="johndoe@email.com" required/>
      </Card.Content>
      <Card.Footer>
        <Button isSubmitting={sending} >
          Send Verification Email
        </Button>
      </Card.Footer>
    </form>
    {/if}
  </Card.Root>