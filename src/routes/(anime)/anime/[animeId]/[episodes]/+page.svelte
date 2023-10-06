<script lang="ts">
	import Player from '$lib/components/Player.svelte';
	export let data;
	if (data.skipTime.statusCode === 200) {
		console.log(data.skipTime);
	}
</script>

<h1 class="my-3 w-fit text-3xl font-bold">{data?.episodesList?.title ?? 'N/A'}</h1>
<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
	<div class="col-span-2">
		<Player {data} />
	</div>
	<div class="flex flex-wrap content-start items-start justify-start gap-4">
		{#each data.episodesList.episodes as episode}
			<a
				class="card-hover chip border p-3"
				style="background-color: {data.epNo === Number(episode.number) ? 'white' : ''};"
				href={`${episode.id}`}>{episode.number}</a
			>
		{/each}
	</div>
</div>
