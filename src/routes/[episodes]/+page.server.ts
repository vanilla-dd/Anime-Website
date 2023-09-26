import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	async function getEpisodes() {
		const episodesList = await anilist.fetchEpisodesListById(params.episodes);
		return episodesList;
	}
	return {
		episodesList: getEpisodes()
	};
};
