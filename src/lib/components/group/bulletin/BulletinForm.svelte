<script lang="ts" context="module">
	import { z } from 'zod';

	export const bulletinSchema = z.object({
		priority: z.number().min(1, 'Priority is required').max(3),
		expiryDate: z.string().min(1, 'Expiry date is required'), // Store expiry as a number that will be ms added to current time
		content: z
			.string()
			.min(10, 'Bulletin must be at least 10 characters.')
			.max(1000, 'Bulletin must be at most 1000 characters.')
	});
	export type BulletinSchema = typeof bulletinSchema;
</script>

<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-french-toast';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	import ExpiryField from './ExpiryField.svelte';
	import PriorityField from './PriorityField.svelte';

	export let dataForm;
	export let closeDialog: () => void;

	const form = superForm(dataForm, {
		validators: zodClient(bulletinSchema),
		onUpdated({ form: f }) {
			if (!f.valid && f.message) {
				toast.error(f.message);
			}
			if (f.valid) {
				toast.success('Bulletin created successfully!');
				closeDialog();
			}
		},
		onSubmit({ formData }) {
			const currentDate = Date.now();
			formData.set('priority', $formData['priority']);
			formData.set('expiryDate', $formData['expiryDate']);
		},
		taintedMessage: 'You have unsaved changes. Are you sure you want to leave?'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" action="?/createBulletin" class="flex h-full flex-col gap-2" use:enhance>
	<Form.Field {form} name="priority" class="flex flex-grow flex-col gap-2 space-y-0">
		<Form.Control let:attrs>
			<Form.Label>Priority:</Form.Label>
			<PriorityField
				value={$formData.priority}
				onUpdate={(priority) => ($formData.priority = priority)}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="expiryDate" class="flex flex-grow flex-col gap-2 space-y-0">
		<Form.Control let:attrs>
			<Form.Label>Expiry Date:</Form.Label>
			<ExpiryField
				value={$formData.expiryDate}
				onUpdate={(expiryDate) => ($formData.expiryDate = expiryDate)}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="content" class="flex flex-grow flex-col gap-2 space-y-0">
		<Form.Control let:attrs>
			<Form.Label>Content:</Form.Label>
			<Textarea
				{...attrs}
				placeholder="Your message to your group..."
				class="flex-grow resize-none p-4"
				bind:value={$formData.content}
				rows={5}
			/>
			<span class="ml-auto text-sm text-muted-foreground"
				>{$formData.content?.length || '0'} / 1000</span
			>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button isSubmitting={$submitting}>Create Bulletin</Form.Button>
</form>
