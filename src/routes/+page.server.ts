import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';
interface miniFiedResults {
	id: string;
	image: string | undefined;
}
export const load: PageServerLoad = async () => {
	async function trendingAnime() {
		const { results } = await anilist.fetchTrendingAnime(1, 20);
		const miniFiedResults: miniFiedResults[] = results.map((result) => {
			return { id: result.id, image: result.image };
		});
		return miniFiedResults;
	}

	return {
		trendingAnime: trendingAnime()
	};
};
