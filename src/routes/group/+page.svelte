<script lang="ts">
	import Share from './(components)/share.svelte';
	import Create from './(components)/create.svelte';
	import Bulletin from './(components)/bulletins/bulletin.svelte';

	export let data;
	let { user, group, groupMembers, shareLink } = data;
	$: ({ user, group, groupMembers, shareLink } = data);
</script>

{#if !user}
	<p>Please sign in to access this feature</p>
{:else if !group}
	<Create dataForm={data.form} />
{:else}
	<div class="grid-columns-2 grid grid-rows-2 gap-2">
		<Share {groupMembers} {group} {shareLink} {user} />
		<Bulletin />
	</div>

	<!-- Carousal for recent notes -->
{/if}
