<script lang="ts">
	import { CassetteTape, Heart, ListPlus, Play } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	export let data;
	function formatAiringTimeInHours(timeUntilAiring: number) {
		const timeUntilAiringMs = timeUntilAiring * 1000;
		if (timeUntilAiringMs >= 86400000) {
			// If time until airing is 24 hours or more, display days remaining
			const daysUntilAiring = Math.floor(timeUntilAiringMs / 86400000); // 1 day = 86400000 milliseconds
			return `${daysUntilAiring} day(s) remaining`;
		} else {
			// Display time until airing in hours
			const hoursUntilAiring = Math.floor(timeUntilAiringMs / 3600000); // 1 hour = 3600000 milliseconds
			return `${hoursUntilAiring} hour(s) until airing`;
		}
	}
	// Function to format airing time as a date
	const formatAiringTimeAsDate = (airingTime: number) =>
		new Date(airingTime * 1000).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			timeZoneName: 'shortGeneric'
		});

	function dateFormat(
		month: number | undefined,
		year: number | undefined,
		day: number | undefined
	) {
		const dateFormatter = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
		const date = new Date(`${month} ${day}, ${year}`);
		// Format the date using the Intl.DateTimeFormat object
		const formattedDate = dateFormatter.format(date);

		return formattedDate;
	}
</script>

<svelte:head>
	<meta property="og:image" content={data.animeInfo.image} />
	<meta property="og:title" content={`Watch ${data.animeInfo.title.romaji}`} />
	<meta property="og:description" content="Just Watch It 😄" />
</svelte:head>
<div class="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
	<img
		class="pointer-events-none absolute h-full scale-125 touch-none object-cover object-center opacity-40 blur-md grayscale"
		src={data.animeInfo.cover}
		alt=""
	/>
	<main class="grid grid-cols-3">
		<div class="justify-self-center">
			<img
				class="w-80"
				src={data.animeInfo.image}
				alt=""
				loading="lazy"
				style:--anime="image-{data.animeInfo.id}"
			/>
		</div>
		<div class="flex flex-col gap-4">
			<ol class="breadcrumb ml-1">
				<li class="crumb">
					<a class="anchor font-bold no-underline hover:underline" href="/">Home</a>
				</li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
				<li class="crumb">
					<a class="anchor font-bold no-underline hover:underline" href="/">{data.animeInfo.type}</a
					>
				</li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
				<li class="max-w-[20ch] truncate font-semibold">{data.animeInfo.title.romaji}</li>
			</ol>
			<h1 class="text-5xl font-bold">
				{data.animeInfo.title.romaji}
			</h1>
			<div class="flex items-center gap-2 font-bold">
				<span class="variant-filled chip py-1 text-[.6rem] font-bold hover:cursor-default"
					>{data.animeInfo.isAdult ? 'R-rated' : 'PG-13'}</span
				>
				<span class="chip bg-green-300 py-1 text-[.6rem] font-bold text-black hover:cursor-default"
					>HD</span
				>
				<span
					class="chip flex gap-1 bg-indigo-500 py-1 text-[.675rem] font-bold text-black hover:cursor-default"
				>
					<CassetteTape class="h-4 w-4" />
					{data.animeInfo.episodes?.length} / {data.animeInfo.totalEpisodes}
				</span>
				<ul class="flex items-center gap-2 text-sm">
					<li class="crumb flex gap-1">
						&#x25CF;
						<p>
							{data.animeInfo.type}
						</p>
					</li>
					<li class="crumb flex gap-1">
						&#x25CF
						<p class="flex items-center">
							<Heart class="w-4 fill-red-600 stroke-white" />
							{data.animeInfo.rating ?? 'N/A'}
						</p>
					</li>
					<li class="crumb flex gap-1">
						&#x25CF;
						<p class="font-semibold uppercase">{data.animeInfo.subOrDub}</p>
					</li>
					<li class="crumb flex gap-1">
						&#x25CF;
						<p class="font-semibold uppercase">{data.animeInfo.duration}</p>
					</li>
				</ul>
			</div>
			<div class="flex gap-5">
				{#if data.animeInfo.totalEpisodes && data.animeInfo.totalEpisodes > 0 && data?.animeInfo?.episodes && data.animeInfo.episodes.length > 0}
					<a
						class="text-md btn flex gap-1 rounded-md px-4 py-2 font-semibold text-black"
						style="background-color: {data.animeInfo.color ?? 'yellow'};"
						href={`/anime/${data.animeInfo.id}/${data.animeInfo.episodes[0].id}`}
					>
						<Play class="w-5 fill-black" />
						Watch Now</a
					>
				{:else}
					<button
						on:click={() => toast.error('No Episodes 😭')}
						class="variant-filled-primary btn rounded-md px-4 font-semibold"
						>No Episodes Availabel Right Now...</button
					>
				{/if}
				<button class="variant-ghost-success btn flex gap-2 rounded-md" disabled>
					<ListPlus />
					Add To List</button
				>
			</div>
			<div class="max-h-[23rem] overflow-scroll will-change-scroll">
				{#if data.animeInfo.description && data.animeInfo.description.length > 50}
					<p class="font-semibold first-letter:text-2xl">
						{@html data.animeInfo.description?.slice(
							0,
							data.animeInfo.description?.lastIndexOf('(S')
						)}
					</p>
				{:else}
					<p>Description Not Available</p>
				{/if}
			</div>
		</div>
		<div class=" flex w-full flex-col gap-2 place-self-center px-3">
			<div class="flex gap-1">
				<h1 class="text-base font-bold underline underline-offset-2">Next Ep. In</h1>
				:
				<div>
					{#if data.animeInfo.nextAiringEpisode}
						{formatAiringTimeAsDate(data.animeInfo.nextAiringEpisode.airingTime)}
						<div class="flex">
							( {formatAiringTimeInHours(data.animeInfo.nextAiringEpisode.timeUntilAiring)} )
						</div>
						<h1>
							Ep No. :
							{data.animeInfo.nextAiringEpisode.episode}
						</h1>
					{:else}
						<p class="font-bold">N/A</p>
					{/if}
				</div>
			</div>
			<div class="flex max-w-min truncate">
				<h1 class="text-md font-bold underline underline-offset-1">Synonyms</h1>
				<p>
					: {data.animeInfo.synonyms}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Status</h1>
				<p>
					: {data.animeInfo.status}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Origin</h1>
				<p>
					: {data.animeInfo.countryOfOrigin}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Duration</h1>
				<p>
					: {data.animeInfo.duration}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Popularity</h1>
				<p>
					: {data.animeInfo.popularity}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Premiered</h1>
				<p class="capitalize">
					: {data.animeInfo.season?.toLowerCase()}
					{data.animeInfo.releaseDate}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Aired</h1>
				<p>
					:
					{dateFormat(
						data.animeInfo.startDate?.month,
						data.animeInfo.startDate?.year,
						data.animeInfo.startDate?.day
					)} to
					{#if data.animeInfo.endDate?.day}
						{dateFormat(
							data.animeInfo.endDate?.month,
							data.animeInfo.endDate?.year,
							data.animeInfo.endDate?.day
						)}
					{:else}
						?
					{/if}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Genres</h1>
				<p class="flex gap-2">
					: {#each data.animeInfo.genres || '' as gen}
						<a
							href="/tag/{gen.toLowerCase()}"
							class="card-hover rounded-sm border px-2 font-thin hover:border-green-500">{gen}</a
						>
					{/each}
				</p>
			</div>
			<div class="flex">
				<h1 class="text-md font-bold underline underline-offset-1">Studios</h1>
				<p>
					: {data.animeInfo.studios}
				</p>
			</div>
		</div>
	</main>
</div>

<!-- "airingTime":1695912960,"timeUntilAiring":33035,"episode":10} 1/1/1970 -->

<style>
	img {
		/* width: 100%; */
		view-transition-name: var(--anime);
	}
</style>
