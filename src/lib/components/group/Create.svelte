<script lang="ts" context="module">
	import { z } from 'zod';

	export const groupSchema = z.object({
		groupName: z.string().min(3).max(30)
	});

	export type GroupSchema = typeof groupSchema;
</script>

<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card/index.js';

	import { toast } from 'svelte-french-toast';

	export let dataForm;

	const form = superForm(dataForm, {
		validators: zodClient(groupSchema),
		onUpdated({ form: f }) {
			if (!f.valid && f.message) {
				toast.error(f.message);
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root class="w-full max-w-[600px]">
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Create a Group</Card.Title>
		<Card.CardDescription
			>Get started with a group to share and learn everything running shoes!</Card.CardDescription
		>
	</Card.Header>
	<form method="POST" action="?/createGroup" use:enhance>
		<Card.CardContent>
			<Form.Field {form} name={'groupName'}>
				<Form.Control let:attrs>
					<Form.Label class="capitalize">Group Name</Form.Label>
					<Input {...attrs} bind:value={$formData.groupName} type="text" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.CardContent>
		<Card.Footer>
			<Form.Button isSubmitting={$submitting}>Create</Form.Button>
		</Card.Footer>
	</form>
</Card.Root>
