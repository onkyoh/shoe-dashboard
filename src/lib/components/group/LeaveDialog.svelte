<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import FormButton from '$lib/components/ui/form/form-button.svelte';
	import Icon from '$lib/components/ui/icon';

	import type { SubmitFunction } from '@sveltejs/kit';

	import toast from 'svelte-french-toast';

	import { enhance } from '$app/forms';

	let deleteDialogOpen = false;
	let isLoading = false;

	const leaveGroupAction: SubmitFunction = () => {
		isLoading = true;
		return async ({ update, result }) => {
			isLoading = false;
			if (result.type === 'success') {
				toast.success(`Succesfully left group!`);
				deleteDialogOpen = false;
				await update();
			} else if (result.type === 'failure' && result.data) {
				toast.error(result.data.message);
			}
		};
	};
</script>

<Dialog.Root closeOnOutsideClick={false} bind:open={deleteDialogOpen}>
	<Button variant="destructive" on:click={() => (deleteDialogOpen = true)}
		><Icon icon="mingcute:exit-fill" class="text-2xl" /></Button
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure you want to leave this group?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently remove you from this group and you will
				not be able to join unless you are invited again. Additionally you will lose your current
				role.
			</Dialog.Description>
		</Dialog.Header>
		<form action="?/leaveGroup" method="POST" use:enhance={leaveGroupAction}>
			<FormButton variant="destructive" isSubmitting={isLoading} disabled={isLoading}
				>Leave</FormButton
			>
		</form>
	</Dialog.Content>
</Dialog.Root>
