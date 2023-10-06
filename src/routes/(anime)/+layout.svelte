<script lang="ts">
	import { page } from '$app/stores';
	import type { IAnimeInfo, IAnimeResult, ISearch } from '@consumet/extensions';
	import { Search } from 'lucide-svelte';
	// Define a debounce function
	let searchAnime: IAnimeInfo[] = [];
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
		const res: ISearch<IAnimeInfo> = await data.json();
		// Perform your desired action here, e.g., make an API request
		console.log(res.results);
		searchAnime = res.results;
		console.log(searchAnime);
	}, 700);
	// Function to be debounced (e.g., an event handler)
	function handleInputChange(e: any) {
		// Debounce the update to debouncedValue
		debouncedHandleInputChange(e.currentTarget.value);
		shown = true;
	}
	let shown = false;
</script>

<nav class="variant-glass-tertiary sticky top-0 z-50 flex items-center justify-between px-3 py-3">
	<a href="/">
		<img src="" alt="" />
		<h1 class="text-2xl font-extrabold text-cyan-200">LOGO</h1>
	</a>
	<div class="flex items-center gap-5">
		<div class="relative">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-sm">
				<input
					type="text"
					on:input={(e) => {
						handleInputChange(e);
					}}
					class="input py-[6px] lg:w-64"
					placeholder="Search Anime"
				/>
				<button class="input-group-shim btn rounded-none py-1">
					<Search class="w-5" />
				</button>
			</div>
			<div
				class="absolute top-full flex w-full flex-col overflow-scroll border border-gray-500 bg-slate-800"
				style="display:{shown ? 'flex' : 'none'}"
			>
				{#each searchAnime ?? '' as anime}
					<a
						style:--anime="search-{anime.id}"
						href={`/anime/${anime.id}`}
						on:click={() => (shown = false)}
						class="flex gap-3 py-2 hover:bg-white hover:text-black"
					>
						<img src={anime.image} alt="" class="h-12 w-12 object-contain" />
						<div>
							<h1 class="max-w-[25ch] truncate font-bold">{anime.title.romaji}</h1>
							<div class="flex gap-3 text-[10px] font-bold">
								<p class="">{anime.type}</p>
								<p>{anime.totalEpisodes}</p>
								<p>{anime.rating}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
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

<style>
	a {
		/* transition: all 0.3s ease; */
		view-transition-name: var(--anime);
	}
</style>
