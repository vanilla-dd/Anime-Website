<script lang="ts">
	import 'vidstack/player/styles/default/theme.css';
	import 'vidstack/player/styles/default/layouts/audio.css';
	import 'vidstack/player/styles/default/layouts/video.css';
	import 'vidstack/player';
	import 'vidstack/player/layouts';
	import 'vidstack/player/ui';
	import type { MediaPlayerElement } from 'vidstack/elements.js';
	import { onDestroy } from 'svelte';
	export let url: string;
	export let title: string;
	export let subtitle: title[];
	export let skipIntro: string;
	export let skipOutro: string;
	type title = {
		url: string;
		lang: string;
	};
	let player: MediaPlayerElement;
	onDestroy(() => {
		player.destroy();
	});
</script>

{JSON.stringify(skipIntro)}
{JSON.stringify(skipOutro)}
<media-player
	class="aspect-video"
	bind:this={player}
	{title}
	id="player"
	crossorigin
	src={`https://m3u8-proxy-cors-olive.vercel.app/cors?url=${url}`}
>
	<media-provider>
		{#each subtitle as sub}
			{#if sub.lang === 'Thumbnails'}
				{''}
			{:else}
				<track
					src={`https://cors-anywhere-e65k.onrender.com/${sub.url}`}
					kind="subtitles"
					label={sub.lang}
					default={sub.lang == 'English'}
					data-type="vtt"
				/>
			{/if}
		{/each}
	</media-provider>
	<media-video-layout
		thumbnails={`https://cors-anywhere-e65k.onrender.com/${subtitle.at(-1)?.url}`}
	/>
</media-player>
