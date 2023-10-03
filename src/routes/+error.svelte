<script lang="ts">
	import { page } from '$app/stores';
	console.log($page);
</script>

<svelte:head>
	<meta property="og:image" content="" />
	<meta property="og:title" content={$page.error?.message} />
	<meta property="og:description" content="wandered off somewhere??" />
</svelte:head>

<a href="/" class="variant-ghost-success btn rounded-md">Home</a>
<p>{$page.status} {$page.error?.message}</p>
