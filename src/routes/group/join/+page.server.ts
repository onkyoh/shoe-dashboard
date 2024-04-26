import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
	const link = url.searchParams.get('link');
	if (!link) {
		error(400, 'Invite link invalid');
	}

	const { supabase, safeGetSession } = locals;

	const { user } = await safeGetSession();

	if (!user) {
		error(401, 'Must be logged in');
	}

	const { data: userData, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single();

	if (userError || !userData) {
		error(401, 'User not found');
	}

	if (userData.group_id) {
		error(409, 'User already in a group');
	}

	const decoded = Buffer.from(link, 'base64url').toString();
	const [group_id, timestamp] = decoded.split('|');

	if (parseInt(timestamp) < Date.now() / 1000) {
		error(410, 'Invite link expired');
	}

	const { error: groupError } = await supabase
		.from('group_members')
		.insert([{ group_id, user_id: user.id, role: 'viewer' }]);

	if (groupError) {
		error(500, groupError);
	}

	const { error: groupIdError } = await supabase
		.from('users')
		.update({ group_id })
		.eq('id', userData.id);

	if (groupIdError) {
		error(500, groupIdError);
	}

	return {
		name: userData.name
	};
};
