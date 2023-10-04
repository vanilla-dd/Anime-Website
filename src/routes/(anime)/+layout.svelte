<script lang="ts">
	import { page } from '$app/stores';
	import { Search } from 'lucide-svelte';
	// Define a debounce function
	function debounce(func: any, delay: number) {
		let timeoutId: any;

		return (...args: any) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}
	const debouncedHandleInputChange = debounce(async (searchTerm: string) => {
		const data = await fetch('/api/search', { method: 'POST', body: JSON.stringify(searchTerm) });
		const res = await data.json();
		console.log(res);
		// Perform your desired action here, e.g., make an API request
	}, 700);
	// Function to be debounced (e.g., an event handler)
	function handleInputChange(e: any) {
		// Debounce the update to debouncedValue
		debouncedHandleInputChange(e.currentTarget.value);
	}
</script>

<nav class="variant-glass-tertiary sticky top-0 z-50 flex items-center justify-between px-3 py-3">
	<a href="/">
		<img src="" alt="" />
		<h1 class="text-2xl font-extrabold text-cyan-200">LOGO</h1>
	</a>
	<div class="flex items-center gap-5">
		<div class="input-group input-group-divider w-fit grid-cols-[auto_1fr_auto] rounded-sm">
			<input
				type="text"
				on:input={(e) => {
					handleInputChange(e);
				}}
				class="input py-[6px]"
				placeholder="Search Anime"
			/>
			<button class="input-group-shim btn rounded-none py-1">
				<Search class="w-5" />
			</button>
		</div>
		<div>
			{#if $page.data}
				<button class="variant-filled-primary btn rounded-md py-2">Log Out</button>
			{:else}
				<button class="variant-filled-primary btn rounded-md py-2">Log In</button>
			{/if}
		</div>
	</div>
</nav>
<slot />
