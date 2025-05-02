// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.ts'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>,
			getSession: () => Promise<{ session: Session | null }>,
			session: Session | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
