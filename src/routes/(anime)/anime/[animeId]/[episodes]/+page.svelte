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
	function getUrl(quality: string) {
		for (const urlData of data.animeWatch.sources) {
			if (urlData.quality === quality) {
				return urlData.url;
			}
		}
		return null; // Quality not found
	}

	// Get the URL of the default quality or fallback to backup
	const defaultUrl = getUrl('default');
	const backupUrl = getUrl('backup');
	const finalUrl = defaultUrl ? defaultUrl : backupUrl;
</script>

{JSON.stringify(data.animeWatch.sources)}

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
