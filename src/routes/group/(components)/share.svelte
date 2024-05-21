<script lang="ts">
	import type { PageData } from '../$types';
	import type { Selected } from "bits-ui";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { IGroupMember } from "$lib/types";

	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Separator } from "$lib/components/ui/separator";

	import Icon from "$lib/components/ui/icon";
	import FormButton from "$lib/components/ui/form/form-button.svelte";
	import LeaveDialog from "./LeaveDialog.svelte";

	import { beforeNavigate } from '$app/navigation';
	import { enhance } from "$app/forms";

	import { formatName } from "$lib/utils";
	import toast from "svelte-french-toast";

	export let data: PageData;

	let { user, group, groupMembers, shareLink } = data;
	$: ({ user, group, groupMembers, shareLink } = data);

	const roles = [
		'admin', 'editor', 'viewer', 'remove'
	]

	const isAdmin = groupMembers.find(member => (member.role === "admin" || member.role === "owner") && member.user_id === user?.id)

	let isLoading = false;
	let editedArray: IGroupMember[] = [];
	let formElement: HTMLFormElement;

	const copyLink = async () => {
		if (!shareLink) return
		try {
			await navigator.clipboard.writeText(shareLink);
			toast.success("Link copied to clipboard");
		} catch {
			toast.error("Failed to copy link");
		}

	};

    function handleRoleChange(updatedMember: IGroupMember, newRole: Selected<string> | undefined) {
		if (!newRole) return
		const currentRole = groupMembers.find(member => member.id === updatedMember.id)?.role
		if (currentRole === newRole.value) {
			editedArray = editedArray.filter(member => member.id !== updatedMember.id)
		} else {
			editedArray = [...editedArray, { ...updatedMember, role: newRole.value }]
		}
    }

	beforeNavigate(({ cancel }) => {
        if (editedArray.length > 0) {
            if (!confirm('You have unsaved changes. Are you sure you want to leave this page?')) {
                cancel();
            }
        }
    });

	const updateMembersAction: SubmitFunction = () => {
		isLoading = true;
		return async ({ update, result }) => {
			isLoading = false;
			if (result.type === 'success' && result.data) {
				await update();
				toast.success(`Member roles updated successfully!`);
				editedArray = [];
			} else if (result.type === 'failure' && result.data) {
				toast.error(result.data.message);
			}
		};
	};
    

</script>

<Card.Root class="w-full overflow-y-auto">
	{#if isAdmin}
	<Card.Header>
		<Card.Title>Invite members to {group?.name}</Card.Title>
		<div class="flex space-x-2 pt-2">
			<Input value={shareLink} readonly class="text-muted-foreground"/>
			<Button on:click={copyLink}><Icon icon="ph:link-bold" class="text-2xl"/></Button>
		</div>
	</Card.Header>
	{:else}
	<Card.Header>
		<Card.Title class="text-2xl">{group?.name}</Card.Title>
	</Card.Header>
	{/if}
	<Card.Content>		
		<Separator class="mb-4" />

		<div class="flex justify-end gap-2 mb-4">
        {#if isAdmin}
			<form action="?/updateRoles" method="POST" use:enhance={updateMembersAction} bind:this={formElement}>
				<input type="hidden" name="members" value={JSON.stringify(editedArray)}>
				<FormButton disabled={editedArray.length === 0 || isLoading} isSubmitting={isLoading} class="w-fit ml-auto"><Icon icon="ic:round-save" class="text-2xl"/></FormButton>
			</form>
		{/if}
			<LeaveDialog/>
		</div>

		<div class="space-y-4">
			<div class="flex items-center justify-between space-x-4">
				<h4 class="font-medium">Members</h4>
				<h4 class="font-medium">Role</h4>
			</div>
			
			{#if groupMembers.length === 0}
				<p class="text-muted-foreground">No members in your group. Pass around the share link to get started.</p>
			{:else}
			<div class="grid gap-6">
				{#each groupMembers as member}
					<div class="flex items-center justify-between space-x-4 text-muted-foreground">
						<div class="flex items-center space-x-4">
							{formatName(member.users.name)}
						</div>
						{#if !isAdmin || member.role === 'owner'}
							<p class="capitalize">{member.role}</p>
						{:else}
							<Select.Root selected={{value: member.role}} onSelectedChange={(event) => handleRoleChange(member, event)}>
								<Select.Trigger class="ml-auto w-[120px]">
									<Select.Value placeholder={member.role} class="capitalize"/>
								</Select.Trigger>
								<Select.Content>
									{#each roles as role}
										<Select.Item value={role} label={role} class="capitalize"
											>{role}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/if}
					</div>
				{/each}
			</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>