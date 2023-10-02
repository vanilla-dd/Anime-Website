<script lang="ts">
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';
	import type { MediaPlayerElement } from 'vidstack/elements.js';
	let player: MediaPlayerElement;
	import { onMount } from 'svelte';
	export let data;
	onMount(async () => {
		player = (await import('vidstack/player')).default;
	});
	// Get the URL of the default quality or fallback to backup
</script>

<media-player
	load="idle"
	class="player aspect-video"
	bind:this={player}
	autoplay
	crossorigin
	src={data.animeWatch.sources[4].url}
>
	<media-provider> </media-provider>
	<media-video-layout />
	<media-menu>
		<media-menu-button aria-label="Settings">
			<media-icon type="settings" data-rotate></media-icon>
		</media-menu-button>
		<media-menu-items>
			<media-menu>
				<media-quality-menu-button label="Quality"></media-quality-menu-button>
				<media-quality-menu-items auto-label="Auto"></media-quality-menu-items>
			</media-menu>
		</media-menu-items>
	</media-menu>
</media-player>
<div class="flex flex-wrap gap-2">
	{#each data.episodesList.episodes as episode}
		<a class="card-hover border p-2" href={`${episode.id}`}>{episode.number}</a>
	{/each}
</div>
