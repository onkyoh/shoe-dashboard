<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";

	import type { IGroupMember, IGroup } from "$lib/types";
	import type { User } from '@supabase/supabase-js'
	import toast from "svelte-french-toast";

    export let groupMembers: IGroupMember[]
    export let group: IGroup
	export let shareLink: string | undefined
	export let user: User 

	const roles = [
        {
            value: "admin",
            label: "Admin"
        },
		{
			value: "viewer",
			label: "Viewer",
		},
		{
			value: "editor",
			label: "Editor",
		},
	];

	const isAdmin = groupMembers.find(member => member.role === "admin" && member.users?.id === user?.id)


	const copyLink = async () => {
		if (!shareLink) return
		try {
			await navigator.clipboard.writeText(shareLink);
			toast.success("Link copied to clipboard");
		} catch {
			toast.error("Failed to copy link");
		}

	};

</script>

<Card.Root>
	{#if isAdmin}
	<Card.Header>
		<Card.Title>Invite members to {group.name}</Card.Title>
		<Card.Description>Anyone with this link can join this group.</Card.Description>
		<div class="flex space-x-2">
			<Input value={shareLink} readonly />
			<Button variant="secondary" class="shrink-0" on:click={copyLink}>Copy Link</Button>
		</div>
	</Card.Header>
	{:else}
	<Card.Header>
		<Card.Title class="text-2xl">{group.name}</Card.Title>
	</Card.Header>
	{/if}
	<Card.Content>		
		<Separator class="my-4" />
		<div class="space-y-4">
		
			<h4 class="text-sm font-medium">Members</h4>
			
			{#if groupMembers.length === 0}
				<p class="text-muted-foreground">No members in your group. Pass around the share link to get started.</p>
			{:else}
			<div class="grid gap-6">
				{#each groupMembers as member}
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							{member.users?.name}
						</div>
						{#if isAdmin}
						<Select.Root selected={member.role}>
							<Select.Trigger class="ml-auto w-[120px]">
								<Select.Value value={member.role} placeholder={member.role} class="capitalize"/>
							</Select.Trigger>
							<Select.Content>
								{#each roles as role}
									<Select.Item value={role.value} label={role.label}
										>{role.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
						{:else}
						<p class="capitalize">{member.role}</p>
						{/if}
					</div>
				{/each}
			</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>