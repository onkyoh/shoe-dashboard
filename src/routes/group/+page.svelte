<script lang="ts">  
  import Share from './(components)/share.svelte';
  import Create from './(components)/create.svelte';

  export let data
    let { supabase, user, group, groupMembers, shareLink } = data
    $: ({ supabase, user, group, groupMembers } = data)

</script>

{#if !user}
    <p>Please sign in to access this feature</p>
{:else}
  {#if !group}
    <Create dataForm={data.form}/>
  {:else}
    <Share groupMembers={groupMembers} group={group} shareLink={shareLink} user={user}/>
  {/if}
{/if}
