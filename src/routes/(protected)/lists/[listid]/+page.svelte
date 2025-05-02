<script lang="ts">
	import type { PageProps } from './$types';
	import NavButton from '$lib/components/NavButton.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import List from '$lib/components/List/List.svelte';

	let { data }: PageProps = $props();
	let { listname: {name: listname}, listItems } = data;
	$inspect(data)
</script>

<Card title={listname}>
	<List items={listItems} />
</Card>
