<script lang="ts" context="module">
	import { z } from 'zod';
	export const noteSchema = z.object({
		content: z
			.string()
			.min(10, 'Note must be at least 10 characters.')
			.max(1000, 'Note must be at most 1000 characters.')
	});
	export type FormSchema = typeof noteSchema;
</script>

<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-french-toast';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { Tables } from '$lib/schema';

	export let dataForm;
	export let shoe: Tables<'shoes'>;
	export let closeDialog: () => void;

	const form = superForm(dataForm, {
		validators: zodClient(noteSchema),
		onUpdated({ form: f }) {
			if (!f.valid && f.message) {
				toast.error(f.message);
			}
			if (f.valid) {
				toast.success('Note created successfully!');
				closeDialog();
			}
		},
		onSubmit({ formData }) {
			formData.set('shoe_id', shoe.id);
			formData.set('shoe_name', shoe.name);
		},
		taintedMessage: 'You have unsaved changes. Are you sure you want to leave?'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form method="POST" action="?/create" class="flex h-full flex-col gap-2" use:enhance>
	<Form.Field {form} name="content" class="flex flex-grow flex-col gap-2 space-y-0">
		<Form.Control let:attrs>
			<Textarea
				{...attrs}
				placeholder="Your notes about this shoe..."
				class="min-h-64 flex-grow resize-none p-4"
				bind:value={$formData.content}
			/>
			<span class="ml-auto text-sm text-muted-foreground"
				>{$formData.content?.length || '0'} / 1000</span
			>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button isSubmitting={$submitting}>Create Note</Form.Button>
</form>
