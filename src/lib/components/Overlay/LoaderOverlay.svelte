<script lang="ts">
	import { getVisibility } from './overlayStore.svelte';
</script>

{#if getVisibility()}
	<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs transition-opacity duration-300">
		<div class="flex flex-col items-center space-y-4">
			<div class="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
		</div>
	</div>
{/if}
