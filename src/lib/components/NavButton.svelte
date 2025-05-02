<script lang="ts">
	export let goto;
	export let label;

	function redirect(goto: string) {
		window.location.href = goto;
	}
</script>
<button onclick="{() => redirect(goto)}" class="btn btn-primary w-full">{label}</button>
