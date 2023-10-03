<script lang="ts">
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import OgTags from '$lib/components/OGTags.svelte';
	export let data;
</script>

<OgTags
	image={'https://anime-website-omega.vercel.app/logo.jpg'}
	title={'Anime Website'}
	description={'Just a normal anime website'}
/>
<div>
	<h1>Popular Animes</h1>
	<AnimeCard animeList={data.popularAnime} />
	<h1>Trending Animes</h1>
	<AnimeCard animeList={data.trendingAnime} />
	<h1>Airing Schulde Animes</h1>
	<AnimeCard animeList={data.airingSchedule} />
</div>
