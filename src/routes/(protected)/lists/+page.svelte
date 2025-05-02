<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/Card/Card.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import CardTitle from '$lib/components/Card/CardTitle.svelte';

	let { data } = $props();
	let { isHome, lists, error } = data;
	$inspect(lists)
	$inspect(error)
</script>

<Card title="Grocery Lists">
	{#each lists as list}
		<NavButton label={list.name} goto={`/lists/${list.listid}`} />
	{/each}
</Card>
