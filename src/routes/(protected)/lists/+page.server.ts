import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase }}) => {
	let { data: lists, error } = await supabase
		.from('lists')
		.select('*')

	return {
		lists: lists as Array<{ listid: number, name: string, ownerid: string }>,
		error: error
	};
}) satisfies PageServerLoad;