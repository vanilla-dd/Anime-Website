import type { IAnimeResult, ISearch } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
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
		trendingAnime: trendingAnime()
	};
};
