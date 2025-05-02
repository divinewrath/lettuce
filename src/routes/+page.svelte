<script lang="ts">
	import Logout from '$lib/components/Logout.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import List from '$lib/components/List/List.svelte';
	import Dock from '$lib/components/Dock.svelte';
	let { data } = $props();
	let { session } = data;
	let name = session?.user?.user_metadata?.name;
</script>

<Card title="Witaj, {name}">
	<NavButton label="Przejdź do listy" goto="/lists" />
</Card>
