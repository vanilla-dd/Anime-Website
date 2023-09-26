import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const data = async () => {
		// const { image, title } = await anilist.fetchAnimeInfo(params.animeId);
		const data = await fetch(`https://api.consumet.org/meta/anilist/info/${params.animeId}`);
		const { image, title } = await data.json();
		return {
			image,
			title
		};
	};
	return {
		animeInfo: data(),
		id: params.animeId
	};
};
