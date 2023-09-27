<script lang="ts">
	export let data;
</script>

<!-- {JSON.stringify(data.episodesList)} -->
<div class="flex flex-wrap gap-2">
	{#each data.episodesList.episodes as episode}
		<a class="card-hover border p-2" href={`${data.episodesList.id}/${episode.id}`}
			>{episode.number}</a
		>
	{/each}
</div>
