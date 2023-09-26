import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	async function trendingAnime() {
		const { results } = await anilist.fetchTrendingAnime(1, 20);
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
