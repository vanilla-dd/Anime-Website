<script lang="ts">
	import Player from '$lib/components/Player.svelte';
	export let data;
</script>

{#if data.animeWatch.error}
	{data.animeWatch.error}
{:else}
	<h1 class="my-3 w-fit text-3xl font-bold">{data?.episodesList?.title ?? 'N/A'}</h1>
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
		<div class="col-span-2">
			<Player
				title={data.episodesList.title}
				url={data.animeWatch.sources.at(-1).url}
				sub={data.animeWatch.subtitles[0].url}
				thumb={data.animeWatch.subtitles.at(-1).url}
				skipIntro={data.animeWatch.intro}
				skipOutro={data.animeWatch.outro}
			/>
		</div>
		<div class="flex flex-wrap content-start items-start justify-start gap-4">
			{#each data.episodesList.episodes as episode}
				<a
					class="card-hover chip border p-3"
					style="background-color: {data.epNo === Number(episode.number) ? 'white' : ''};"
					href={`${episode.url?.slice(episode.url.lastIndexOf('/') + 1)}&epNo=${episode.number}
					`}>{episode.number}</a
				>
			{/each}
		</div>
	</div>
{/if}
