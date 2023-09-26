import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = async () => {
		const { sources, download } = await anilist.fetchEpisodeSources(params.watch);
		return {
			sources,
			download
		};
	};
	return {
		animeWatch: data()
	};
};
