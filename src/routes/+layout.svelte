<script lang="ts">
	import { preparePageTransition } from '$lib/viewTransition';
	import '../app.postcss';
	preparePageTransition();
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<slot />
