import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { groupSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const form = await superValidate(zod(groupSchema)); // Assuming you have 'groupSchema' defined

	const session = await getSession();
	if (!session) {
		return { form, group: null, groupMembers: [] }; // User not logged in
	}

	const userId = session.user.id;

	// find group they belong to
	const { data: group, error: groupError } = await supabase
		.from('users_groups')
		.select('*') // Assuming 'groups' in a foreign key relation
		.eq('user_id', userId)
		.single();

	const { data: groupMembers, error: membersError } = await supabase
		.from('users_groups')
		.select('*') // Assuming 'groups' in a foreign key relation
		.eq('group_id', group.group_id);

	return {
		form,
		group,
		groupMembers
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(groupSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { supabase, getSession } = event.locals;

		const session = await getSession();

		// check if in another group

		const { data: group, error: groupError } = await supabase
			.from('groups')
			.insert([{ name: form.data.name }])
			.select()
			.single();

		if (groupError) {
			return fail(500, { message: 'Supabase error:', error: groupError });
		}

		// Now, link the new group to the user in the users_groups table
		const { error: linkError } = await supabase.from('users_groups').insert([
			{
				user_id: session?.user.id,
				group_id: group.id,
				role: 'admin',
				users_name: session?.user.user_metadata.name
			}
		]);

		if (linkError) {
			console.error('Error linking group to user:', linkError);
			// Optionally, handle rollback manually if needed
			// For instance, you might delete the group that was just created
			return fail(500, { message: 'Supabase error:', error: linkError });
		}

		return {
			success: true,
			form
		};
	}
};
