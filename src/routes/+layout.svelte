<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import GoogleLogin from '$lib/components/GoogleLogin.svelte';
	import Logout from '$lib/components/Logout.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import Dock from '$lib/components/Dock.svelte';

	let { data, children } = $props();
	let { isHome } = data;
	let { session, supabase } = $derived(data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				if (event === 'SIGNED_OUT') {
					await goto('/')
				}
				await invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{@render children()}
<Dock />