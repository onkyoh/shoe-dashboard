import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session, user } = await safeGetSession();

	if (!user) {
		return { session, user: null, group: null };
	}

	try {
		// Fetch user data
		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('*')
			.eq('id', user.id)
			.single();

		if (userError || !userData) {
			throw new Error('Failed to fetch user data');
		}

		// Fetch group data (dependent on userData, thus sequential)
		const { data: groupData } = await supabase
			.from('groups')
			.select('*')
			.eq('id', userData.group_id)
			.single();

		return {
			session,
			user: userData,
			group: groupData
		};
	} catch (error) {
		return {
			session,
			user: null,
			group: null
		};
	}
};
