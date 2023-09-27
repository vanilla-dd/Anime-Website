import type { IAnimeEpisode, IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	async function getEpisodes() {
		// const episodesList = await anilist.fetchEpisodesListById(params.episodes);
		const data = await fetch(`https://api.consumet.org/meta/anilist/info/${params.episodes}
		`);
		const { episodes, id } = (await data.json()) as IAnimeInfo;
		return { episodes: episodes as IAnimeEpisode[], id: id as string };
	}
	return {
		episodesList: getEpisodes()
	};
};
