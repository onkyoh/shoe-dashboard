import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { groupSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { IGroupMember, IGroup } from '$lib/types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const form = await superValidate(zod(groupSchema));

	let group: IGroup | null = null;
	let groupMembers: IGroupMember[] = [];

	const { user } = await safeGetSession();
	if (!user) {
		return { form, group, groupMembers };
	}

	const userId = user.id;

	const { data: userData, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.single();

	if (!userError && userData) {
		const { data: groupData, error: groupError } = await supabase
			.from('groups')
			.select('*')
			.eq('id', userData.group_id)
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
			.eq('group_id', userData.group_id);

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
	create: async (event) => {
		const form = await superValidate(event, zod(groupSchema));

		if (!form.valid) {
			return message(form, 'Group name is note valid');
		}

		const { supabase, safeGetSession } = event.locals;

		const { user } = await safeGetSession();

		if (!user) {
			return message(form, 'Must be logged in', { status: 401 });
		}

		const { error } = await supabase.rpc('create_group_and_link_user', {
			user_id: user.id,
			group_name: form.data.name
		});

		if (error) {
			return message(form, 'Something went wrong, try again later', { status: 500 });
		}

		return {
			form
		};
	}
};
