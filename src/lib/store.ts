import { writable } from 'svelte/store';
function getType(type: string) {
	const { subscribe, update } = writable(type);
	function changeType() {
		update((type) => (type === 'sub' ? 'dub' : 'sub'));
	}

	return { subscribe, changeType };
}
export const subOrDub = getType('sub');

// subOrDub.update((value) => (value === 'sub' ? 'dub' : 'sub')); // logs '2'
