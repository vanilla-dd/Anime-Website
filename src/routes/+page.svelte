<script lang="ts">
	import AnimeCard from '$lib/components/AnimeCard.svelte';

	export let data;
</script>

<svelte:head>
	<meta
		property="og:image"
		content="https://anime-website-omega.vercel.app/mugiwara-the-illustration-vector.jpg"
	/>
	<meta property="og:title" content="Anime Webiste" />
	<meta property="og:description" content="A aniWatch clone" />
</svelte:head>
<AnimeCard animeList={data.trendingAnime} />
<!-- <AnimeCard animeList={data.recentEpisodes} /> -->
