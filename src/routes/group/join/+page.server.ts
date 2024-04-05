import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
	const link = url.searchParams.get('link');
	if (!link) {
		error(400, 'Invite link invalid');
	}

	const { supabase, getSession } = locals;

	const session = await getSession();

	if (!session) {
		error(401, 'Must be logged in');
	}

	const { data: user, error: userError } = await supabase
		.from('users')
		.select('*')
		.eq('id', session.user.id)
		.single();

	if (userError || !user) {
		error(401, 'User not found');
	}

	if (user.group_id) {
		error(409, 'User already in a group');
	}

	const decoded = Buffer.from(link, 'base64url').toString();
	const [group_id, timestamp] = decoded.split('|');
	if (parseInt(timestamp) < Date.now() / 1000) {
		error(410, 'Invite link expired');
	}

	const { error: groupError } = await supabase
		.from('group_members')
		.insert([{ group_id, user_id: session.user.id, role: 'viewer' }]);

	if (groupError) {
		error(500, groupError);
	}

	const { error: groupIdError } = await supabase
		.from('users')
		.update({ group_id })
		.eq('id', session.user.id);

	if (groupIdError) {
		error(500, groupIdError);
	}

	return {
		name: user.name
	};
};
