<script lang="ts">
	export let data;
	const animeInfo = data.animeInfo;
</script>

<img src={animeInfo.image} alt="" style:--planet="image-{data.id}" />
<h1>{animeInfo.title}</h1>

<style>
	img {
		/* width: 100%; */
		margin-block: 4rem;
		view-transition-name: var(--planet);
	}
</style>
