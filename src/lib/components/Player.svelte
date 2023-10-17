<script lang="ts">
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';
	import type { MediaPlayerElement } from 'vidstack/elements.js';
	export let url: string;
	export let title: string;
	export let sub: string;
	export let thumb: string;
	export let skipIntro: string;
	export let skipOutro: string;
	let player: MediaPlayerElement;
	import { onMount } from 'svelte';
	onMount(async () => {
		player = (await import('vidstack/player')).default;
	});
</script>

{JSON.stringify(skipIntro)}
<media-player
	load="idle"
	class="player aspect-video"
	bind:this={player}
	autoplay
	{title}
	crossorigin
	src={`https://m3u8-proxy-cors-olive.vercel.app/cors?url=${url}`}
>
	<media-provider></media-provider>
	<media-video-layout />
	<media-menu>
		<media-menu-button aria-label="Settings">
			<media-icon type="settings" data-rotate></media-icon>
		</media-menu-button>
		<media-menu-items>
			<media-quality-menu-button label="Quality"></media-quality-menu-button>
			<media-quality-menu-items auto-label="Auto"></media-quality-menu-items>
		</media-menu-items>
	</media-menu>
</media-player>
