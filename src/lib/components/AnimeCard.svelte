<script lang="ts">
	import type { ITitle } from '@consumet/extensions';
	interface minifiedResults {
		id: string;
		image: string | undefined;
		title: string | ITitle;
		number: number | null;
	}
	export let animeList: minifiedResults[];
</script>

<div class="hide-scrollbar flex gap-2 overflow-scroll p-2">
	{#each animeList as anime}
		<div class="flex flex-shrink-0 rounded-lg px-1">
			<div class="flex flex-col items-center justify-end gap-2 pr-2 text-end">
				<h1
					style="text-orientation: sideways; writing-mode: vertical-rl; "
					class="text-md h-[20ch] rotate-180 truncate text-start font-semibold capitalize"
				>
					{anime.title.romaji.toLowerCase()}
				</h1>
				<p class="text-lg font-bold">
					{#if anime.number}
						{#if anime.number < 10}
							0{anime.number}
						{:else}
							{anime.number}
						{/if}
					{/if}
				</p>
			</div>
			<a href={`/anime/${anime.id}`}>
				<img
					class="h-full w-52 object-cover"
					style="image-rendering: optimizeSpeed;"
					src={`
					https://consument-psi.vercel.app/utils/image-proxy?url=${anime.image}&headers={}&referer=https://s4.anilist.co
					`}
					alt={''}
					loading="lazy"
					style:--anime="image-{anime.id}"
				/>
			</a>
		</div>
	{/each}
</div>

<style>
	img {
		/* transition: all 0.3s ease; */
		view-transition-name: var(--anime);
	}
</style>
