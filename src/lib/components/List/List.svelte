<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Icon from "@iconify/svelte";
	import { updateVisibility } from '$lib/components/Overlay/overlayStore.svelte';

	let { items = [] } = $props();
	let newText = $state('');
	let showNewInput = $state(false);
	let longPressTarget: number | null = $state(null);

	let startX = 0;
	let currentX = 0;
	let draggedIndex: number | null = null;
	let isDragging = false;
	const threshold = 60; // px

	function addItem() {
		if (newText.trim()) {
			items = [...items, newText.trim()];
			newText = '';
			showNewInput = false;
		}
	}

	function editItem(index: number) {
		newText = items[index];
		items = items.filter((_, i) => i !== index);
		showNewInput = true;
		longPressTarget = null;
	}

	function removeItem(index: number) {
		items = items.filter((_, i) => i !== index);
		longPressTarget = null;
	}

	function handleTouchStart(e: TouchEvent, index: number) {
		startX = e.touches[0].clientX;
		draggedIndex = index;
		isDragging = true;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging || draggedIndex === null) return;
		currentX = e.touches[0].clientX;
		const deltaX = currentX - startX;
		const el = document.getElementById(`item-${draggedIndex}`);
		if (el && deltaX > 0) {
			el.style.transform = `translateX(${Math.min(deltaX, 128)}px)`;
		}
	}

	function handleTouchEnd() {
		if (!isDragging || draggedIndex === null) return;
		const deltaX = currentX - startX;
		if (deltaX > threshold) {
			longPressTarget = draggedIndex;
		} else {
			longPressTarget = null;
		}

		const el = draggedIndex !== null && document.getElementById(`item-${draggedIndex}`);
		if (el) el.style.transform = '';
		isDragging = false;
		draggedIndex = null;
	}

	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest('.actions')) {
				longPressTarget = null;
			}
		};
		document.addEventListener('click', handleClickOutside);
		onDestroy(() => document.removeEventListener('click', handleClickOutside));
	});
</script>

<div class="p-6 max-w-md mx-auto bg-base-100 shadow-md rounded-lg space-y-4">
	<ul class="space-y-2">
		{#each items as item, index}
			<li class="relative bg-base-200 rounded overflow-hidden">
				<div
					class="h-full actions absolute inset-y-0 left-0 flex flex-row w-32 -translate-x-32 transition-transform duration-200 ease-out"
					class:translate-x-0={longPressTarget === index}
					style="z-index: 0;"
				>
					<button class="h-full btn btn-sm btn-info flex-1 rounded-none" onclick={() => editItem(index)}>
						<Icon icon="lucide:edit" width="24" height="24" />
					</button>
					<button class="h-full btn btn-sm btn-error flex-1 rounded-none" onclick={() => removeItem(index)}>
						<Icon icon="lucide:trash-2" width="24" height="24" />
					</button>
				</div>

				<div
					id={`item-${index}`}
					class="relative z-10 flex-1 bg-base-200 p-3 transition-transform duration-200 ease-out"
					class:translate-x-32={longPressTarget === index}
					ontouchstart={(e) => handleTouchStart(e, index)}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
				>
					<div class="flex items-center justify-between">
						<span>{item.name}</span>
						<input type="checkbox" class="checkbox checkbox-primary" />
					</div>
				</div>
			</li>
		{/each}
	</ul>

	{#if showNewInput}
		<div class="flex gap-2">
			<input
				bind:value={newText}
				type="text"
				placeholder="Wpisz tekst"
				class="input input-bordered w-full"
			/>
			<button class="btn btn-success" onclick={addItem}>Zapisz</button>
		</div>
	{:else}
		<button class="btn btn-primary w-full" onclick={() => showNewInput = true}>
			Dodaj nowy wiersz
		</button>
	{/if}
</div>
