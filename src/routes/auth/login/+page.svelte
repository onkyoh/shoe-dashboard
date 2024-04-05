  <script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import Spinner from "$lib/components/ui/spinner/spinner.svelte";
	  import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";

    import { loginSchema } from "./schema";
    import {
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from 'svelte-french-toast';


    export let data;
    let { supabase } = data
    $: ({ supabase } = data)


    async function signInWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    }

    const form = superForm(data.form, {
      validators: zodClient(loginSchema),
    });
   
    const { form: formData, enhance, errors, submitting, constraints, message } = form;

    // Define the type of fields as an array of strings
    const fields: Array<keyof typeof $formData> = ['email', 'password'];

      $: if ($message) {
      toast.error($message);
    }
      
  </script>


<Card.Root class="w-full max-w-[600px]">
  <form method="POST" use:enhance>
  <Card.Header class="space-y-1">
    <Card.Title class="text-2xl">Login to account</Card.Title>
  </Card.Header>
  <Card.Content class="grid gap-4">
    <div class="grid">
      <Button variant="outline" on:click={signInWithGoogle}> 
        <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
        Google
      </Button>
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
      </div>
    </div>
      {#each fields as field}
      <Form.Field {form} name={field}>
        <Form.Control let:attrs>
          <Form.Label class="capitalize">{field}</Form.Label>
          <Input {...attrs} bind:value={$formData[field]} type={field} {...$constraints[field]}/>
        </Form.Control>
        <Form.FieldErrors errors={$errors[field]}/>
      </Form.Field>
      {/each}
  </Card.Content>
  <Card.Footer>
    <Button class="w-full" type="submit">{#if $submitting}<Spinner className="text-white mr-2"/>{/if}Login</Button>
  </Card.Footer>
</form>
</Card.Root>

