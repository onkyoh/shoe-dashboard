import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { groupSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { IGroupMember, IGroup } from '$lib/types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const form = await superValidate(zod(groupSchema));

	let group: IGroup | null = null;
	let groupMembers: IGroupMember[] = [];

	const { session } = await safeGetSession();
	if (!session) {
		return { form, group, groupMembers };
	}

	const userId = session.user.id;

	const { data: user, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.single();

	if (!userError && user) {
		const { data: groupData, error: groupError } = await supabase
			.from('groups')
			.select('*')
			.eq('id', user.group_id)
			.single();

		if (!groupError) {
			group = groupData;
		}

		const { data: groupMembersData, error: membersError } = await supabase
			.from('group_members')
			.select(
				`
			*,
			users (
			  name,
			  id
			)
		  `
			)
			.eq('group_id', user.group_id);

		if (!membersError) {
			groupMembers = groupMembersData;
		}

		if (groupMembers.find((member) => member.user_id === userId)?.role === 'admin' && group) {
			const combinedString = `${group.id}|${Date.now() / 1000 + 60 * 60 * 24 * 7}`;
			const shareLink = `${import.meta.env.VITE_BASE_URL}/group/join?link=${Buffer.from(combinedString).toString('base64url')}`;
			return {
				form,
				group,
				groupMembers,
				shareLink
			};
		}
	}

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

		if (!session) {
			return fail(401, { form, message: 'Must be logged in' });
		}

		const { data: group, error: groupError } = await supabase
			.from('groups')
			.insert([{ name: form.data.name }])
			.select()
			.single();

		if (groupError || !group) {
			return fail(500, { form, message: 'Supabase error:', error: groupError });
		}

		// Now, link the new group to the user in the users_groups table
		const { error: linkError } = await supabase.from('group_members').insert([
			{
				user_id: session.user.id,
				group_id: group.id,
				role: 'admin'
			}
		]);

		if (linkError) {
			console.error('Error linking group to user:', linkError);
			// Optionally, handle rollback manually if needed
			// For instance, you might delete the group that was just created
			return fail(500, { form, message: 'Supabase error:', error: linkError });
		}

		const { error: userError } = await supabase
			.from('users')
			.update({ group_id: group.id })
			.eq('id', session.user.id);

		if (userError) {
			return fail(500, { form, message: 'Supabase error:', error: userError });
		}

		return {
			redirect: '/group'
		};
	}
};
