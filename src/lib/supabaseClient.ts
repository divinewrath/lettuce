import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export interface List {
	listid: string;
	name: string;
	ownerid: string;
}

export interface ListItem {
	id: string;
	name: string;
	checked: boolean;
	listid: string;
}
