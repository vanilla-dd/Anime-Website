<script lang="ts">
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';
	import type { MediaPlayerElement } from 'vidstack/elements.js';
	export let data;
	let player: MediaPlayerElement;
	import { onMount } from 'svelte';
	onMount(async () => {
		player = (await import('vidstack/player')).default;
	});
</script>

<media-player
	load="idle"
	class="player aspect-video"
	bind:this={player}
	autoplay
	crossorigin
	src={data.animeWatch.sources[4].url}
	title={data.episodesList.title}
>
	<media-provider></media-provider>
	<media-video-layout />
	<media-menu-button aria-label="Settings">
		<media-icon type="settings" data-rotate></media-icon>
	</media-menu-button>
	<media-menu-items>
		<media-menu>
			<media-quality-menu-button label="Quality"></media-quality-menu-button>
			<media-quality-menu-items auto-label="Auto"></media-quality-menu-items>
		</media-menu>
	</media-menu-items>
</media-player>
