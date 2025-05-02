import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase }}) => {
	let { listid } = params;
	let { data: listItems } = await supabase
		.from('list_items')
		.select('*')
		.eq('listid', listid);

	let { data: listname } = await supabase
		.from('lists')
		.select('name')
		.limit(1);

	return {
		listname: listname?.[0],
		listItems: listItems as Array<{ id: string, name: string, listid: string, checked: boolean }>
	};
}) satisfies PageServerLoad;
