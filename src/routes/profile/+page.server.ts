import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		error(401, {
			message: 'Must be logged in'
		});
	}
};
