  <script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema } from "./schema";
    import {
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	  import Spinner from "$lib/components/ui/spinner/spinner.svelte";
	  import Button from "$lib/components/ui/button/button.svelte";


    export let data;
    let { supabase } = data
    $: ({ supabase } = data)


    async function signInWithGoogle() {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    }


    const form = superForm(data.form, {
      validators: zodClient(formSchema),
    });
   
    const { form: formData, enhance, errors, submitting, constraints, message } = form;

    // Define the type of fields as an array of strings
    const fields: Array<keyof typeof $formData> = ['email', 'password'];
      
  </script>

   
  <form method="POST" use:enhance class="max-w-md mx-auto">
    {#if $message}
    <p class="bg-red-600 text-white p-2">{$message}</p>
    {/if}
    {#each fields as field}
    <Form.Field {form} name={field}>
      <Form.Control let:attrs>
        <Form.Label class="capitalize">{field}</Form.Label>
        <Input {...attrs} bind:value={$formData[field]} type={field} {...$constraints.email}/>
      </Form.Control>
      <Form.FieldErrors errors={$errors[field]}/>
    </Form.Field>
    {/each}
    <Form.Button>
      {#if $submitting}<Spinner />{/if}
    Submit
  </Form.Button>
  </form>
  <hr class="w-full my-2">
  <Button on:click={signInWithGoogle}>Sign in with Google</Button>
