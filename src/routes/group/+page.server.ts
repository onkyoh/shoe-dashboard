import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { groupSchema } from '$lib/components/group/Create.svelte';
import { bulletinSchema } from '$lib/components/group/BulletinForm.svelte';
import { zod } from 'sveltekit-superforms/adapters';
import type { Tables } from '$lib/schema';
import type { IBulletin, IGroupMember, INote } from '$lib/types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const groupForm = await superValidate(zod(groupSchema));
	const bulletinForm = await superValidate(zod(bulletinSchema));
	try {
		const { user } = await parent();

		if (!user) {
			throw new Error('No user or group return defaults');
		}

		const [group, groupMembers, bulletins, notes] = await Promise.all([
			supabase
				.from('groups')
				.select('*')
				.eq('id', user.group_id)
				.single()
				.then(({ data }) => data) as Promise<Tables<'groups'> | null>,
			supabase
				.from('group_members')
				.select('*, users (name)')
				.eq('group_id', user.group_id)
				.then(({ data }) => data) as Promise<IGroupMember[] | null>,
			supabase
				.from('bulletins')
				.select('*,	users: users(name)')
				.eq('group_id', user.group_id)
				.order('created_at', { ascending: false })
				.then(({ data }) => data) as Promise<IBulletin[] | null>,
			supabase
				.from('notes')
				.select('*,	users: users(name)')
				.eq('group_id', user.group_id)
				.range(0, 9)
				.order('created_at', { ascending: false })
				.then(({ data }) => data) as Promise<INote[] | null>
		]);

		const shareLink = groupMembers?.find(
			(member) => member.user_id === user.id && ['admin', 'owner'].includes(member.role)
		)
			? generateShareLink(user.group_id)
			: '';

		return {
			groupForm,
			bulletinForm,
			group,
			shareLink,
			groupMembers: groupMembers || [],
			bulletins: bulletins || [],
			notes: notes || []
		};
	} catch (err) {
		error(401, {
			message: 'Must be logged in',
			link: {
				href: '/auth/login',
				label: 'Login to create or join a group'
			}
		});
	}
};

function generateShareLink(groupId: string) {
	const combinedString = `${groupId}|${Date.now() / 1000 + 60 * 60 * 24 * 7}`;
	return `${import.meta.env.VITE_BASE_URL}/group/join?link=${Buffer.from(combinedString).toString('base64url')}`;
}

export const actions: Actions = {
	createGroup: async (event) => {
		const groupForm = await superValidate(event, zod(groupSchema));

		if (!groupForm.valid) {
			return message(groupForm, 'Group name is not valid');
		}

		const { supabase, safeGetSession } = event.locals;

		const { user } = await safeGetSession();

		if (!user) {
			return message(groupForm, 'Must be logged in', { status: 401 });
		}

		const { error } = await supabase.rpc('create_group_and_link_user', {
			user_id: user.id,
			group_name: groupForm.data.groupName
		});

		if (error) {
			return message(groupForm, 'Something went wrong, try again later', { status: 500 });
		}

		return {
			groupForm
		};
	},
	createBulletin: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(bulletinSchema));

		if (!form.valid) {
			return message(form, 'Invalid bulletin');
		}

		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();

		if (!user) {
			return message(form, 'Must be logged in', { status: 401 });
		}

		// Fetch user data (similar to note action, but group_id is already in form data)
		const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();

		if (!userData) {
			return message(form, 'Must be logged in', { status: 401 });
		}

		// Insert bulletin data
		const { error: bulletinError } = await supabase
			.from('bulletins')
			.insert([
				{
					content: form.data.content,
					group_id: userData.group_id,
					priority: form.data.priority, // Assuming priority is in the form
					delete_at: new Date(form.data.expiryDate)
				}
			])
			.select()
			.single();

		if (bulletinError) {
			return message(form, 'Error creating bulletin, try again later.', {
				status: 500
			});
		}

		return {
			form
		};
	},
	editBulletin: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(bulletinSchema));
		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();
		const bulletinId = formData.get('bulletin_id');

		if (!form.valid && form.errors.content) {
			return fail(400, {
				message: form.errors.content[0] || 'Invalid bulletin'
			});
		}

		if (!user) {
			return fail(401, {
				message: 'Must be logged in'
			});
		}

		if (!bulletinId) {
			return fail(500, {
				message: 'An unknown error occured'
			});
		}

		// Update the bulletin
		const { data } = await supabase
			.from('bulletins')
			.update({
				content: form.data.content,
				priority: form.data.priority, // Update priority
				delete_at: new Date(form.data.expiryDate), // Update delete_at based on expiryDate
				created_at: new Date()
			})
			.eq('id', bulletinId)
			.select();

		if (!data || data?.length < 1) {
			return fail(401, {
				message: 'You do not have permission to edit this bulletin'
			});
		}

		return {
			success: true,
			action: 'updated'
		};
	},
	deleteBulletin: async (event) => {
		const formData = await event.request.formData();
		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();
		const bulletinId = formData.get('bulletin_id');

		if (!user) {
			return fail(401, {
				message: 'Must be logged in'
			});
		}

		if (!bulletinId) {
			return fail(501, {
				message: 'An unknown error occured'
			});
		}

		// Delete the bulletin from Supabase
		const { data } = await supabase.from('bulletins').delete().eq('id', bulletinId).select();

		if (!data || data?.length < 1) {
			return fail(401, {
				message: 'You do not have permission to delete this bulletin'
			});
		}

		return { success: true, action: 'deleted' };
	},
	updateRoles: async (event) => {
		const formData = await event.request.formData();
		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();
		const members = formData.get('members');
		let parsedMembers: IGroupMember[] | undefined;

		if (!user) return fail(401, { message: 'Must be logged in' });
		if (!members || typeof members !== 'string')
			return fail(500, { message: 'An unknown error occurred' });

		try {
			parsedMembers = JSON.parse(members);
		} catch (parseError) {
			return fail(500, { message: 'An unknown error occurred' });
		}

		// Extract members being updated from those being removed
		const updatedMembers: Tables<'group_members'>[] = [];
		const removedMembers: IGroupMember[] = [];
		parsedMembers?.forEach((member: IGroupMember) => {
			if (member.role === 'remove') {
				removedMembers.push(member);
			} else {
				const { users, ...rest } = member;
				updatedMembers.push(rest);
			}
		});

		const { error: upsertError } = await supabase
			.from('group_members')
			.upsert(updatedMembers, { onConflict: 'id' });

		if (upsertError) {
			return fail(500, { message: 'An unknown error occurred during update' });
		}

		const { error: deleteError } = await supabase
			.from('group_members')
			.delete()
			.in(
				'id',
				removedMembers.map((member) => member.id)
			);

		if (deleteError) {
			return fail(500, { message: 'An unknown error occurred during removal' });
		}

		return { success: true };
	},
	leaveGroup: async (event) => {
		const { supabase, safeGetSession } = event.locals;
		const { user } = await safeGetSession();

		if (!user) return fail(401, { message: 'Must be logged in' });

		const { error } = await supabase.from('group_members').delete().eq('user_id', user.id);

		if (error) {
			return fail(500, { message: 'An unknown error occurred during removal' });
		}

		return { success: true };
	}
};
