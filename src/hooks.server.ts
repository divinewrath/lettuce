import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import type { Session } from '@supabase/supabase-js'

const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				return event.cookies.getAll()
			},
			setAll(cookiesToSet) {
				/**
				 * Note: You have to add the `path` variable to the
				 * set and remove method due to sveltekit's cookie API
				 * requiring this to be set, setting the path to an empty string
				 * will replicate previous/standard behavior (https://kit.svelte.dev/docs/types#public-types-cookies)
				 */
				cookiesToSet.forEach(({ name, value, options }) =>
					event.cookies.set(name, value, { ...options, path: '/' })
				)
			},
		},
	})

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.getSession = async () => {
		// const {
		// 	data: { session },
		// } = await event.locals.supabase.auth.getSession()
		// if (!session) {
		// 	return { session: null, user: null }
		// }
		//
		// const {
		// 	data: { user },
		// 	error,
		// } = await event.locals.supabase.auth.getUser()
		//
		// if (error) {
		// 	// JWT validation has failed
		// 	return { session: null, user: null }
		// }
		//
		// return { session, user }

		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()

		if (!session) return { session: null }

		try {
			const { data, error } = await event.locals.supabase.auth.getClaims(session.access_token)
			if (error || !data) return { session: null }
			const { claims } = data

			const validated_session: Session = {
				access_token: session.access_token,
				refresh_token: session.refresh_token,
				expires_at: claims.exp,
				expires_in: claims.exp - Math.round(Date.now() / 1000),
				token_type: 'bearer',
				user: {
					app_metadata: claims.app_metadata ?? {},
					aud: 'authenticated',
					created_at: '',
					id: claims.sub,
					email: claims.email,
					phone: claims.phone,
					user_metadata: {
						avatar_url: claims.user_metadata?.avatar_url,
						nickname: claims.user_metadata?.nickname
					},
					is_anonymous: claims.is_anonymous
				}
			}

			return { session: validated_session }
		} catch (err) {
			console.error(err)
			return { session: null }
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
	})
}

const isProtected = (routeId: string | null) => {
	return routeId?.startsWith('/(protected)') || routeId === '/';
}

let xxxdebug = true;
const authGuard: Handle = async ({ event, resolve }) => {
	const { session } = await event.locals.getSession();
	event.locals.session = session;
	let routeId = event?.route?.id
	let fromUrl = event.url.pathname
	if (xxxdebug) {
		console.log('props start')
		console.log({ routeId })
		console.log({ isProtected: isProtected(routeId) })
		// console.log({ fromUrl })
		// console.log({ session: !!session })
		console.log('props end')
	}
	if (!event.locals.session && isProtected(routeId)) {
		if (xxxdebug) {
			console.log('no session, redirecting to login page');
			console.log(event.locals.session)
			console.log(event.url.pathname)
		}
		throw redirect(303, `/auth/login?redirectTo=${fromUrl}`);
	}

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
