import type { IAnimeEpisode, IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';
import { anilist } from '$lib/server/anilist';

export const load: PageServerLoad = async ({ params, fetch }) => {
	async function getEpisodes() {
		// const episodesList = await anilist.fetchEpisodesListById(params.episodes);
		const data = await fetch(`https://consument-psi.vercel.app/meta/anilist/info/${params.animeId}
		`);
		const { episodes, id } = (await data.json()) as IAnimeInfo;
		return { episodes: episodes as IAnimeEpisode[], id: id as string };
	}
	const data = async () => {
		const { sources, download } = await anilist.fetchEpisodeSources(params.episodes);
		return {
			sources,
			download
		};
	};
	return {
		animeWatch: data(),
		episodesList: getEpisodes()
	};
};
