import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

const Lists = writable([]);

const loadLists = async () => {
	const { data, error } = await supabase
		.from('lists')
		.select('*');

	if (error) {
		return console.error(error);
	}

	// @ts-ignore
	Lists.set(data);

	return data;
};

export {
	Lists,
	loadLists
}
