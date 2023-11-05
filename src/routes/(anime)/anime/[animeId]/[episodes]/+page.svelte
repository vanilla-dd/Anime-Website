<script lang="ts">
	export let data;
</script>

{#if data.animeWatch.error}
	{data.animeWatch.error}
{:else}
	<h1 class="my-3 w-fit text-3xl font-bold">{data?.episodesList?.title ?? 'N/A'}</h1>
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
		<div class="col-span-2">
			{#await import('$lib/components/player/main.js')}
				<div class="aspect-video h-full w-full bg-black"></div>
			{:then { Player }}
				<svelte:component
					this={Player}
					title={data.episodesList.title}
					subtitle={data.animeWatch.subtitles}
					url={data.animeWatch.sources.at(-1).url}
					skipOutro={data.animeWatch.outro}
					skipIntro={data.animeWatch.intro}
				/>
			{/await}
		</div>
		<div
			class="mt-10 flex max-h-96 flex-wrap content-start items-start justify-start gap-4 overflow-scroll"
		>
			{#each data.episodesList.episodes as episode}
				<a
					data-sveltekit-reload
					class="card-hover chip border px-3 py-2"
					style="background-color: {data.epNo === Number(episode.number) ? 'white' : ''};"
					href={`${episode.id.split('/')[2] ?? episode.url?.split('/watch/')[1]}&epNo=${
						episode.number
					}		
 `}>{episode.number}</a
				>
			{/each}
		</div>
	</div>
{/if}
