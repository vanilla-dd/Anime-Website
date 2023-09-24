<script lang="ts">
	import { preparePageTransition } from '$lib/viewTransition';
	import '../app.postcss';
	preparePageTransition();
	import { Toaster } from 'svelte-french-toast';
	// import { onNavigate } from '$app/navigation';
	// export const preparePageTransition = () => {
	// 	// before completing the navigation, start a new transition
	// 	onNavigate((navigation) => {
	// 		if (!document.startViewTransition) return;

	// 		return new Promise((resolve) => {
	// 			document.startViewTransition(async () => {
	// 				resolve();
	// 				await navigation.complete;
	// 			});
	// 		});
	// 	});
	// };
	// preparePageTransition();
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toaster />
<slot />
