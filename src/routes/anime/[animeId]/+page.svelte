<script lang="ts">
	export let data;
</script>

<!-- PlaceHolder -->
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
