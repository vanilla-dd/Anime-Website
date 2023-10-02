import type { IAnimeEpisode, IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	async function getEpisodes() {
		const data = await fetch(`https://consument-psi.vercel.app/meta/anilist/info/${params.animeId}
		`);
		const { episodes, id } = (await data.json()) as IAnimeInfo;
		return {
			episodes: episodes as IAnimeEpisode[],
			id: id as string,
			title: episodes ? episodes[Number(params.episodes.split('-').at(-1)!)].title : ''
		};
	}
	const data = async () => {
		const data = await fetch(
			`https://consument-psi.vercel.app/meta/anilist/watch/${params.episodes}`
		);
		const { sources, download } = await data.json();
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
