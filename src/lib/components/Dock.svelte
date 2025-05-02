<script lang="ts">
	import Icon from "@iconify/svelte";

	function redirect(goto: string) {
		window.location.href = goto;
	}
</script>

<div class="dock">
	<button onclick="{() => redirect('/')}">
		<Icon icon="lucide:home" width="24" height="24" />
		<span class="dock-label">Home</span>
	</button>

	<button>
		<Icon icon="lucide:power" width="24" height="24" />
		<span class="dock-label">Logout</span>
	</button>
</div>