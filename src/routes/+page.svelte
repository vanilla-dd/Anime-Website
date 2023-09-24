<script lang="ts">
	export let data;
</script>

<div class="flex flex-wrap gap-4">
	{#each data.trendingAnime as anime}
		<a href={`/${anime?.id}`}>
			<img
				src={anime?.image}
				style:--planet="image-{anime?.id}"
				alt="helo"
				width="200"
				loading="lazy"
			/>
		</a>
	{/each}
</div>
<a href={`/${data.trendingAnime[1]?.id}`}>Chekcout</a>

<style>
	img {
		transition: opacity 0.3s ease;
		view-transition-name: var(--planet);
	}
</style>
