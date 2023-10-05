<script lang="ts">
	import Player from '$lib/components/Player.svelte';

	export let data;
	if (data.skipTime.statusCode === 200) {
		console.log(data.skipTime);
	}
</script>

<Player {data} />
<div class="flex flex-wrap gap-2">
	{#each data.episodesList.episodes as episode}
		<a class="card-hover border p-2" href={`${episode.id}`}>{episode.number}</a>
	{/each}
</div>
