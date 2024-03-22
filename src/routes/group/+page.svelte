<script lang="ts">

    export let data
    let { supabase, user } = data
    $: ({ supabase, user } = data)
  
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { groupSchema } from './schema'; // Assuming Zod schema

  console.log(data)

  const form = superForm(data.form, {
      validators: zodClient(groupSchema),
  });

  const { form: formData, enhance } = form; 

</script>

{#if !user}
    <p>Please sign in to access this feature</p>
{:else}

<form method="POST" use:enhance>
  <input type="text" name="name" bind:value={$formData.name}>
  <button type="submit">Submit</button>
</form>

    Hello {user?.user_metadata.name}
{/if}
