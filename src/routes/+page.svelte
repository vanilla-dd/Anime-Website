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
<h1>Trending Animes</h1>
<AnimeCard animeList={data.trendingAnime} />
<h1>Recentely Updated Animes</h1>
<AnimeCard animeList={data.recentEpisodes} />
