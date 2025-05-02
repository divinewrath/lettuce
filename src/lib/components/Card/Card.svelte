<script lang="ts">
	import CardTitle from '$lib/components/Card/CardTitle.svelte';
	import LoaderOverlay from '$lib/components/Overlay/LoaderOverlay.svelte';

	let { title = null, children } = $props();

	// let { title = null } = data;
</script>

<div class="flex items-center justify-center min-h-screen bg-base-200">
	<div class="card bg-base-100 shadow-xl w-full max-w-sm">
		<div class="relative card-body items-center text-center">
			{#if title}
				<CardTitle title={title} />
			{/if}
			<div class="w-full space-y-3 mt-4">
				{@render children()}
			</div>
			<LoaderOverlay />
		</div>
	</div>
</div>
