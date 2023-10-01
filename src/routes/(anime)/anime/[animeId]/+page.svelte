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
	<main class="grid grid-cols-1 px-2 py-5">
		<div class="justify-self-center">
			<img
				class="w-56"
				src={data.animeInfo.image}
				alt=""
				loading="lazy"
				style:--anime="image-{data.animeInfo.id}"
			/>
		</div>
		<ol class="breadcrumb hidden lg:flex">
			<li class="crumb">
				<a class="anchor font-bold no-underline hover:underline" href="/">Home</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<a class="anchor font-bold no-underline hover:underline" href="/">{data.animeInfo.type}</a>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb max-w-[20ch] truncate font-semibold">{data.animeInfo.title.romaji}</li>
		</ol>
		<div class="flex flex-col gap-3">
			<h1 class="pt-2 text-center text-xl font-bold">
				{data.animeInfo.title.romaji}
			</h1>
			<div class="flex flex-wrap items-center justify-center gap-2 font-bold">
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
				<ul class="flex items-center gap-2 text-xs">
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
			<div class="flex justify-center gap-5">
				{#if data.animeInfo.totalEpisodes && data.animeInfo.totalEpisodes > 0 && data?.animeInfo?.episodes && data.animeInfo.episodes.length > 0}
					<a
						class="btn flex gap-1 rounded-md px-2 py-1 text-xs font-semibold text-black"
						style="background-color: {data.animeInfo.color ?? 'yellow'};"
						href={`/anime/${data.animeInfo.id}/${data.animeInfo.episodes[0].id}`}
					>
						<Play class="w-4 fill-black" />
						Watch Now</a
					>
				{:else}
					<button
						on:click={() => toast.error('No Episodes 😭')}
						class="variant-filled-primary btn rounded-md px-2 font-semibold"
						>No Episodes Availabel Right Now...</button
					>
				{/if}
				<button
					class="variant-ghost-success btn flex gap-1 rounded-md px-2 text-xs text-white"
					disabled
				>
					<ListPlus class="w-4" />
					Add To List</button
				>
			</div>
			<h1 class="text-xl font-semibold text-white  -mb-2">Overview :-</h1>
			<div class="max-h-[8rem] overflow-scroll text-left will-change-scroll pl-3">
				{#if data.animeInfo.description && data.animeInfo.description.length > 50}
					<p class="font-extralight  first-letter:text-1xl text-sm">
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
		<div class=" flex w-full flex-col gap-1 place-self-center px-3">
			<div class="flex gap-1 items-center">
				<h1 class="text-sm font-semibold">Next Ep. In</h1>
				:
				<div class="text-xs">
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
						<p class="font-semibold">N/A</p>
					{/if}
				</div>
			</div>
			<div class="flex max-w-min items-center gap-1">
				<h1 class="text-sm font-semibold  ">Synonyms:</h1>
				<p class="text-xs overflow-scroll hide-scrollbar whitespace-nowrap pr-2">
					{data.animeInfo.synonyms}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Status</h1>
				<p class="text-xs">
					: {data.animeInfo.status}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Origin</h1>
				<p class="text-xs">
					: {data.animeInfo.countryOfOrigin}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Duration</h1>
				<p class="text-xs">
					: {data.animeInfo.duration}
				</p>
			</div> 
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Popularity</h1>
				<p class="text-xs">
					: {data.animeInfo.popularity}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Premiered</h1>
				<p class="capitalize text-xs">
					: {data.animeInfo.season?.toLowerCase()}
					{data.animeInfo.releaseDate}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Aired</h1>
				<p class="text-xs">
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
			<div class="flex ">
				<h1 class="text-sm font-semibold  ">Genres</h1>
				<p class="flex flex-wrap gap-2 text-xs">
					: {#each data.animeInfo.genres || '' as gen}
						<a
							href="/tag/{gen.toLowerCase()}"
							class="card-hover rounded-sm border px-1 font-thin hover:border-green-500">{gen}</a
						>
					{/each}
				</p>
			</div>
			<div class="flex items-center">
				<h1 class="text-sm font-semibold  ">Studios</h1>
				<p class="text-xs capitalize">
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
