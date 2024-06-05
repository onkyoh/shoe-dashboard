import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { supabase } = event.locals;

		// Validate the form data

		const { error } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: `${import.meta.env.VITE_BASE_URL}/redirect`,
				data: {
					name: form.data.name
				}
			}
		});

		if (error) {
			return setError(form, error.message);
		}

		redirect(303, '/auth/verify-email');
	}
};
