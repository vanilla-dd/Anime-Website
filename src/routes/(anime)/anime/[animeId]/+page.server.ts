import type { IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const data = async () => {
		// FASTER THAN LIB

		const data = await fetch(`https://api.consumet.org/meta/anilist/info/${params.animeId}`);
		const {
			id,
			image,
			title,
			cover,
			description,
			endDate,
			episodes,
			genres,
			isAdult,
			countryOfOrigin,
			recommendations,
			rating,
			relations,
			season,
			releaseDate,
			startDate,
			status,
			studios,
			synonyms,
			totalEpisodes,
			trailer,
			type,
			color,
			subOrDub,
			duration,
			nextAiringEpisode,
			popularity
		} = (await data.json()) as IAnimeInfo;
		if (!id) {
			throw error(404, 'Cannot Find Anime');
		}
		return {
			popularity,
			nextAiringEpisode,
			duration,
			subOrDub,
			id,
			image,
			title,
			cover,
			description,
			endDate,
			episodes,
			genres,
			isAdult,
			countryOfOrigin,
			recommendations,
			rating,
			relations,
			season,
			releaseDate,
			startDate,
			status,
			studios,
			synonyms,
			totalEpisodes,
			trailer,
			type,
			color
		};
	};
	return {
		animeInfo: data()
	};
};
