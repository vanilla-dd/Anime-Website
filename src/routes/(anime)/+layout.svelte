<script lang="ts">
	import { page } from '$app/stores';
	import type { IAnimeInfo, ISearch } from '@consumet/extensions';
	import { Search } from 'lucide-svelte';
	// Define a debounce function
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { subOrDub } from '$lib/store';
	let searchAnime: IAnimeInfo[] = [];
	let searchInput: HTMLInputElement;
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
		searchAnime = res.results;
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
			<input
				bind:this={searchInput}
				type="text"
				on:input={(e) => {
					handleInputChange(e);
				}}
				class="input rounded-none py-[6px] lg:w-80"
				placeholder="Search Anime"
			/>
			<div
				class="absolute top-full flex max-h-[22rem] w-full flex-col overflow-y-scroll border border-gray-500 bg-slate-800"
				style="display:{shown ? 'flex' : 'none'}"
			>
				{#each searchAnime ?? '' as anime}
					<a
						href={`/anime/${anime.id}`}
						on:click={() => {
							shown = false;
							searchInput.value = '';
						}}
						class="flex gap-3 border-b py-2 hover:bg-white hover:text-black"
					>
						<img src={anime.image} alt="" class="h-12 w-12 object-contain" />
						<div>
							<h1 class="max-w-[25ch] truncate font-bold">{anime.title.romaji}</h1>
							<div class="flex gap-3 text-[10px] font-bold">
								<p>{anime.type}</p>
								<p>{anime.totalEpisodes}</p>
								<p>❤️{anime.rating}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<div>
			<button>
				<SlideToggle
					name="slider-label"
					on:click={() => {
						subOrDub.changeType();
						console.log($subOrDub);
					}}>On</SlideToggle
				>
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
