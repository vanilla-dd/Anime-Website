<script lang="ts">
	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';
	import { defineCustomElements } from 'vidstack/elements';
	import { onMount } from 'svelte';
	export let data;
	onMount(async () => {
		await defineCustomElements();
		const player = document.querySelector('media-player');

		player?.onAttach(() => {
			player.currentTime = 100;
			const unsubscribe = player.subscribe(({ paused, playing }) => {
				console.log('Paused:', paused);
				console.log('Playing:', playing);
			});

			unsubscribe();
		});
	});

	// Get the URL of the default quality or fallback to backup
</script>

<media-player
	key-disabled
	control
	src={data.animeWatch.sources[4].url}
	crossorigin
	aspect-ratio="16/9"
>
	<media-outlet></media-outlet>
	<media-community-skin />
</media-player>
<div class="flex flex-wrap gap-2">
	{#each data.episodesList.episodes as episode}
		<a class="card-hover border p-2" href={`${episode.id}`}>{episode.number}</a>
	{/each}
</div>
