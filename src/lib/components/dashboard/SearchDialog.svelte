<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Icon from '$lib/components/ui/icon';
	import Search from '$lib/components/shoes/search/Search.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';

	let searchDialogOpen = false;

	$: $page.url.pathname, (searchDialogOpen = false);
</script>

<div class="md:hidden">
	<Button on:click={() => (searchDialogOpen = true)} variant="ghost">
		<Icon icon="material-symbols:search" class="text-primary" />
	</Button>

	<Dialog.Root closeOnOutsideClick={false} bind:open={searchDialogOpen}>
		<Dialog.Content class="overflow-visible">
			<Search class="mt-2" />
		</Dialog.Content>
	</Dialog.Root>
</div>
