import type { IAnimeResult, ISearch } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	async function recentEpisodes() {
		const data = await fetch(
			'https://consument-psi.vercel.app/meta/anilist/airing-schedule?page=1&perPage=20'
		);
		const { results } = (await data.json()) as ISearch<IAnimeResult>;
		const miniFiedResults = results.map((result) => {
			return {
				id: result.id,
				image: result.image,
				title: result.title,
				number: null
			};
		});
		return miniFiedResults;
	}
	async function trendingAnime() {
		const data = await fetch(
			`https://consument-psi.vercel.app/meta/anilist/trending?page=1&perPage=20`
		);
		const { results } = (await data.json()) as ISearch<IAnimeResult>;
		const miniFiedResults = results.map((result, index) => {
			return {
				id: result.id,
				image: result.image,
				number: index + 1,
				title: result.title
			};
		});
		return miniFiedResults;
	}
	async function popularAnime() {
		const data = await fetch(
			`https://consument-psi.vercel.app/meta/anilist/popular?page=1&perPage=20`
		);
		const { results } = (await data.json()) as ISearch<IAnimeResult>;
		const miniFiedResults = results.map((result, index) => {
			return {
				id: result.id,
				image: result.image,
				number: null,
				title: result.title
			};
		});
		return miniFiedResults;
	}

	return {
		popularAnime: popularAnime(),
		trendingAnime: trendingAnime(),
		recentEpisodes: recentEpisodes()
	};
};
