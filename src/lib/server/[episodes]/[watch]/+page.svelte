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
			player?.subscribe(
				({ qualities, quality, autoQuality, canSetQuality, currentTime, waiting, duration }) => {
					// console.log(waiting);
				}
			);
		});
	});
</script>

<!-- {JSON.stringify(data.animeWatch)} -->
{#each [data.animeWatch] as link}
	{link.download}
	{JSON.stringify(link.sources)}
{/each}

<media-player
	class="aspect-video"
	src="https://www044.vipanicdn.net/streamhls/31014405f62933f3613ce2ec15abf3c4/ep.2.1689268955.m3u8"
	crossorigin
	type="application/x-mpegurl"
	aspect-ratio="16/9"
>
	<media-outlet></media-outlet>
	<media-community-skin />
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

<style>
	/* Apply styles to menu container. */
	media-menu {
	}

	/* Apply styles to button when menu is open. */
	media-quality-menu-button[aria-expanded='true'] {
	}

	/* Apply styles to default back arrow icon. */
	media-quality-menu-button [slot='close-icon'] {
	}

	/* Apply styles to default icon. */
	media-quality-menu-button [slot='icon'] {
	}

	/* Apply styles to default label text. */
	media-quality-menu-button [slot='label'] {
	}

	/* Apply styles to default hint text. */
	media-quality-menu-button [slot='hint'] {
	}

	/* Apply styles to default open chevron icon. */
	media-quality-menu-button [slot='open-icon'] {
	}

	/* Apply styles to floating panel when menu is open. */
	media-quality-menu-items[aria-hidden='false'] {
	}

	/* Apply styles to checked radio item. */
	media-quality-menu-items media-radio[aria-checked='true'] {
	}
	media-quality-menu-items media-radio[aria-checked='true'] [part='check'] {
	}
	media-quality-menu-button[data-focus] {
	}

	media-quality-menu-items media-radio[data-focus] {
	}
</style>
