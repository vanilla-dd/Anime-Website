import { anilist } from '$lib/server/anilist';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = async () => {
		const { image, title } = await anilist.fetchAnimeInfo(params.animeId);
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
