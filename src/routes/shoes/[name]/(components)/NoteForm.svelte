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
	import NoteContainer from './NoteContainer.svelte';
	import type { IShoe } from '$lib/types';

	export let dataForm;
	export let shoe: IShoe;

	const form = superForm(dataForm, {
		validators: zodClient(noteSchema),
		onUpdated({ form: f }) {
			if (!f.valid && f.message) {
				toast.error(f.message);
			}
			if (f.valid) {
				toast.success('Note created successfully!');
			}
		},
		onSubmit({ formData }) {
			formData.set('shoe_id', shoe.id);
			formData.set('shoe_name', shoe.name);
		},
		taintedMessage: () => {
			return new Promise((resolve) => {
				alert();
			});
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<NoteContainer>
	<form method="POST" action="?/create" class="flex h-full flex-col gap-2" use:enhance>
		<Form.Field {form} name="content" class="flex flex-grow flex-col gap-2 space-y-0">
			<Form.Control let:attrs>
				<Textarea
					{...attrs}
					placeholder="Your notes about this shoe..."
					class="flex-grow resize-none p-4"
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
</NoteContainer>
