import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { createBrowserClient, createServerClient, isBrowser, parseCookieHeader } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';

export const load: LayoutLoad = async ({ url, fetch, data, depends }) => {
	depends('supabase:auth');

	const isHome = url.pathname === '/';
	try {
		const supabase = isBrowser()
			? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				}
			})
			: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});
		const session = isBrowser() ? (await supabase.auth.getSession()).data.session : data.session;

		return { supabase, session, isHome }
	} catch {
		return { supabase: null, session: null, isHome }
	}
};
