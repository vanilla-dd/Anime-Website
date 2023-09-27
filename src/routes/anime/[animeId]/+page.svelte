<script lang="ts">
	export let data;
</script>

<!-- PlaceHolder -->
<!-- {#each data.animeInfo.episodes || [] as episode} -->
<!-- {episode?.image} -->
<!-- {/each} -->
<!-- {#each data.animeInfo.recommendations || [] as recommendations} -->
<!-- <img src={recommendations.image} alt="" /> -->
<!-- {recommendations.} -->
<!-- {/each} -->
<!-- {#each data.animeInfo.relations || [] as rel} -->
<!-- {rel.type} -->
<!-- {/each} -->
{data.animeInfo}
<img src={data.animeInfo.cover} alt="" />
<div>
	<img
		class="w-96"
		src={data.animeInfo.image}
		alt=""
		loading="lazy"
		style:--planet="image-{data.id}"
	/>
	<h1 class="text-lg">{data.animeInfo.title.romaji}</h1>
</div>

<style>
	img {
		/* width: 100%; */
		view-transition-name: var(--planet);
	}
</style>
