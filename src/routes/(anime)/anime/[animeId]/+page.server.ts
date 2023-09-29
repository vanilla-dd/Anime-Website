import type { IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

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
			nextAiringEpisode
		} = (await data.json()) as IAnimeInfo;
		return {
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
