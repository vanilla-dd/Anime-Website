<script lang="ts">
	import type { ITitle } from '@consumet/extensions';

	interface minifiedResults {
		id: string;
		image: string | undefined;
		title: string | ITitle;
		number: number;
	}
	export let animeList: minifiedResults[];
</script>

<div class="flex flex-wrap gap-2">
	{#each animeList as anime}
		<div class="flex rounded-lg px-1">
			<div class="flex flex-col items-center justify-end gap-2 pr-2 text-end">
				<h1
					style="text-orientation: sideways; writing-mode: vertical-rl; "
					class="text-md h-[20ch] rotate-180 truncate text-start font-semibold capitalize"
				>
					{anime.title.romaji.toLowerCase()}
				</h1>
				<p class="text-lg font-bold">
					{#if anime.number < 10}
						0{anime.number}
					{:else}
						{anime.number}
					{/if}
				</p>
			</div>
			<a href={`/anime/${anime.id}`}>
				<img
					class="h-full w-52 object-cover"
					style="image-rendering: optimizeSpeed;"
					src={anime.image}
					alt={''}
					loading="lazy"
					style:--planet="image-{anime.id}"
				/>
			</a>
		</div>
	{/each}
</div>

<style>
	img {
		/* transition: all 0.3s ease; */
		view-transition-name: var(--planet);
	}
</style>
