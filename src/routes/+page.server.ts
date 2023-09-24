import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	async function trendingAnime() {
		const { results } = await anilist.fetchTrendingAnime(1, 20);
		return results;
	}

	return {
		trendingAnime: trendingAnime()
	};
};
