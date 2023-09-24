<script lang="ts">
	export let data;
	// const animeInfo = data.animeInfo;
</script>

<img src={data.animeInfo.image} alt="" style:--planet="image-{data.id}" loading="lazy" />
<h1>{data.animeInfo.title}</h1>

<style>
	img {
		/* width: 100%; */
		margin-block: 4rem;
		view-transition-name: var(--planet);
	}
</style>
