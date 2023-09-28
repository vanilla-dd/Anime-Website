import type { IAnimeResult, ISearch, ITitle } from '@consumet/extensions';
import type { PageServerLoad } from './$types';
export declare enum MediaFormat {
	TV = 'TV',
	TV_SHORT = 'TV_SHORT',
	MOVIE = 'MOVIE',
	SPECIAL = 'SPECIAL',
	OVA = 'OVA',
	ONA = 'ONA',
	MUSIC = 'MUSIC',
	MANGA = 'MANGA',
	NOVEL = 'NOVEL',
	ONE_SHOT = 'ONE_SHOT'
}
interface RecentEpisodes {
	id: string;
	malId: number | string;
	title: string | ITitle;
	image: string | undefined;
	rating: number | null;
	color: string | null;
	episodeId: string;
	episodeTitle: string;
	episodeNumber: number;
	type: MediaFormat;
	genres?: string[];
}
export const load: PageServerLoad = async ({ fetch }) => {
	async function recentEpisodes() {
		const data = await fetch('https://api.consumet.org/meta/anilist/recent-episodes');
		const results = (await data.json()) as ISearch<RecentEpisodes>;
		// const miniFiedResults = results.map((result, index) => {
		// return {
		// id: result.id,
		// image: result.image,
		// title: result.title,
		// number: index + 1
		// };
		// });
		// return miniFiedResults;
		console.log(results);
	}
	async function trendingAnime() {
		const data = await fetch(`https://api.consumet.org/meta/anilist/trending?page=1&perPage=20`);
		const { results } = (await data.json()) as ISearch<IAnimeResult>;
		const miniFiedResults = results.map((result, index) => {
			return {
				id: result.id,
				image: result.image,
				title: result.title,
				number: index + 1
			};
		});
		return miniFiedResults;
	}

	return {
		trendingAnime: trendingAnime(),
		recentEpisodes: recentEpisodes()
	};
};
