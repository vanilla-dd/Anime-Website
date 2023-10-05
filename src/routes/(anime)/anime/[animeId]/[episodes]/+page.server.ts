import type { IAnimeEpisode, IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';
type Interval = {
	startTime: number;
	endTime: number;
};

type SkipItem = {
	interval: Interval;
	skipType: string; // You might want to create an enum for skipType values
	skipId: string;
	episodeLength: number;
};

type SkipResponse = {
	found: boolean;
	results: SkipItem[];
	message: string;
	statusCode: number;
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	async function getEpisodes() {
		const data = await fetch(`https://consument-psi.vercel.app/meta/anilist/info/${params.animeId}
		`);
		const { episodes, id } = (await data.json()) as IAnimeInfo;
		return {
			episodes: episodes as IAnimeEpisode[],
			id: id as string,
			title: episodes
				? episodes[Number(params.episodes.split('-').at(-1)!)]
					? episodes[Number(params.episodes.split('-').at(-1)!)].title
					: ''
				: ''
		};
	}
	const animeWatch = async () => {
		const data = await fetch(
			`https://consument-psi.vercel.app/meta/anilist/watch/${params.episodes}`
		);
		const { sources, download } = await data.json();
		return {
			sources,
			download
		};
	};
	// Get skip times
	// https://api.aniskip.com/v2/skip-times/21/2?types=op&types=ed&episodeLength=0
	const skipTime = async () => {
		const data = await fetch(
			`https://api.aniskip.com/v2/skip-times/${params.animeId}/${[
				Number(params.episodes.split('-').at(-1)!)
			]}?types=op&types=ed&episodeLength=0`
		);
		const res = await data.json();
		return res as SkipResponse;
	};
	return {
		animeWatch: animeWatch(),
		episodesList: getEpisodes(),
		skipTime: skipTime()
	};
};
