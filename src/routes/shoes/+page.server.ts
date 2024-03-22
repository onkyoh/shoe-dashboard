export async function load({ locals }) {
	const { supabase } = locals;

	const { data: shoes, error } = await supabase
		.from('shoes')
		.select('*')
		.order('date_added', { ascending: false })
		.range(0, 19);

	return {
		props: {
			shoes
		}
	};
}
