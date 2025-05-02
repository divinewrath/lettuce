import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({locals: { getSession }}) => {
	const { session } = await getSession()

	if (session) {
		throw redirect(303, '/')
	}
});

export const actions: Actions = {
	default: async ({ url, locals: { supabase }}) => {

		const redirectTo = url.searchParams.get('redirectTo') || '/'

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${url.origin}/auth/callback?next=/${redirectTo.slice(1)}`
			}
		})

		if (error) {
			console.log(error)
			return fail(400, {
				message: 'Something went wrong.',
			})
		}

		throw redirect(303, data.url)
	}
}
