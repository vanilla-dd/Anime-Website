<script lang="ts">
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';
	import type { MediaPlayerElement } from 'vidstack/elements.js';
	export let url: string;
	export let title: string;
	export let skipIntro: string;
	export let skipOutro: string;
	type subtitle = {
		url: string;
		lang: string;
	};
	export let subtitle: subtitle[];
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
	{title}
	id="player"
	crossorigin
	src={`https://m3u8-proxy-cors-olive.vercel.app/cors?url=${url}`}
>
	<media-provider></media-provider>
	<media-captions
		class="captions media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300"
	/>
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
	<media-video-layout
		thumbnails={`https://cors-anywhere-e65k.onrender.com/${subtitle.at(-1)?.url}`}
	/>
</media-player>
