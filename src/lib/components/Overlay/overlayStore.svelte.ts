let overlayVisible: boolean = $state(false);

function updateVisibility(state: boolean) {
	overlayVisible = state;
}

function getVisibility(): boolean {
	return overlayVisible;
}

export {
	getVisibility,
	updateVisibility
}
