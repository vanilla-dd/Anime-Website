import type { IAnimeInfo } from '@consumet/extensions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = async () => {
		// FASTER THAN LIB
		const data = await fetch(`https://api.consumet.org/meta/anilist/info/${params.animeId}`);
		const {
			image,
			title,
			cover,
			description,
			endDate,
			episodes,
			genres,
			hasDub,
			hasSub,
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
		} = (await data.json()) as IAnimeInfo;
		return {
			image,
			title,
			cover,
			description,
			endDate,
			episodes,
			genres,
			hasDub,
			hasSub,
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
		animeInfo: data(),
		id: params.animeId
	};
};
