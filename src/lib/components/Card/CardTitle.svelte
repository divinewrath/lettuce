<script>
	let { title = null } = $props();
</script>
{#if title}
	<h2 class="card-title text-2xl">{title}</h2>
{/if}
