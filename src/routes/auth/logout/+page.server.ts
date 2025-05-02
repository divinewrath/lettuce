import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession()
	console.log('logout')
	console.log(session)
	if (session) redirect(303, '/')
}

export const actions: Actions = {
	default: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut()
		redirect(303, '/')
	},
}
