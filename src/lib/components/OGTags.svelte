<script lang="ts">
	export let image: string | undefined;
	export let title: string;
	export let description: string;
</script>

<svelte:head>
	<meta property="og:image" content={image} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
