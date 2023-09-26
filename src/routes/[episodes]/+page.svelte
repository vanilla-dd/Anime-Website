<script lang="ts">
	export let data;
</script>

<!-- {JSON.stringify(data.episodesList)} -->
<div class="flex flex-wrap gap-2">
	{#each data.episodesList as episode}
		{episode.id}
		<!-- {episode.description} -->
		{episode.title}
		<img src={episode.image} alt="" class="block" width="200" loading="lazy" />
	{/each}
</div>

<a href={`/145064/${data.episodesList[1].id}`}>Watch</a>
