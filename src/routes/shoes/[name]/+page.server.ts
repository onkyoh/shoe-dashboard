import { error, fail, type Actions } from '@sveltejs/kit';
import { noteSchema } from './(components)/NoteForm.svelte';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { groupSchema } from '../../group/schema';

export async function load({ locals, params }) {
	const form = await superValidate(zod(groupSchema));
	const { supabase, safeGetSession } = locals;
	const { user } = await safeGetSession();
	let notes = [];

	const { data: shoe, error: queryError } = await supabase
		.from('shoes')
		.select('*')
		.eq('name', params.name)
		.single();

	if (!shoe) {
		error(404, {
			message: 'Shoe not found',
			link: {
				href: '/shoes',
				label: 'Go back to shoes'
			}
		});
	}

	if (queryError) {
		error(500, {
			link: {
				href: '/shoes',
				label: 'Go back to shoes'
			}
		});
	}

	if (user) {
		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('*')
			.eq('id', user.id)
			.single();

		const { data: notesData, error: notesError } = await supabase
			.from('notes')
			.select(
				`
			  *,
			  users (
				name
			  )
			`
			)
			.eq('shoe_name', params.name)
			.or(
				`user_id.eq.${userData.id}${!userData.group_id ? '' : `,group_id.eq.${userData.group_id}`}`
			)
			.order('created_at', { ascending: false });
		if (!notesError && !userError) {
			notes = notesData;
		}
	}

	return { shoe, form, notes };
}

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(noteSchema));

		if (!form.valid) {
			return message(form, 'Note must be between 10 and 1000 characters');
		}

		const { supabase, safeGetSession } = event.locals;

		const { user } = await safeGetSession();

		if (!user) {
			return message(form, 'Must be logged in', { status: 401 });
		}

		const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();

		if (!userData) {
			return message(form, 'Must be logged in', { status: 401 });
		}

		if (!formData.get('shoe_id') || !formData.get('shoe_name')) {
			return message(form, 'Error creating note, try again later.', {
				status: 500
			});
		}

		const { error: noteError } = await supabase
			.from('notes')
			.insert([
				{
					content: form.data.content,
					group_id: userData.group_id,
					shoe_id: formData.get('shoe_id'),
					shoe_name: formData.get('shoe_name')
				}
			])
			.select()
			.single();

		if (noteError) {
			return message(form, 'Error creating note, try again later.', {
				status: 500
			});
		}

		return {
			form
		};
	},
	edit: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(noteSchema));
		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();
		const noteId = formData.get('note_id');

		if (!form.valid) {
			return {
				status: 400, // Or any suitable status code for unauthorized
				error: 'Invalid form'
			};
		}

		if (!user) {
			return {
				status: 401, // Or any suitable status code for unauthorized
				error: 'Must be logged in'
			};
		}

		if (!noteId) {
			return {
				status: 500,
				error: 'Update failed, try again later'
			};
		}
		// Update the note
		const { error } = await supabase
			.from('notes')
			.update({ content: form.data.content, created_at: new Date() })
			.eq('id', noteId);

		if (error) {
			return {
				status: 401, // Or an appropriate code for server error
				error: 'You do not have permission to edit this note.'
			};
		}

		return {
			success: true,
			action: 'updated'
		};
	},
	delete: async (event) => {
		const formData = await event.request.formData();

		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();
		const note_id = formData.get('note_id');

		if (!user) {
			return {
				status: 401,
				error: 'Must be logged in'
			};
		}
		// Validate note_id
		if (!note_id) {
			return {
				status: 500,
				error: 'Something went wrong, try again later'
			};
		}

		// Assuming you have a way to delete notes from Supabase
		const { error } = await supabase
			.from('notes')
			.delete()
			.match({ id: note_id, user_id: user.id }); // Ensure user owns the note

		if (error) {
			return {
				status: 401, // Or an appropriate code for server error
				error: 'You do not have permission to edit this note.'
			};
		}

		return { success: true, action: 'deleted' };
	}
};
