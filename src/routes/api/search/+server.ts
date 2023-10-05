import type { IAnimeInfo } from '@consumet/extensions';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ fetch, request }) => {
	const searchTerm = await request.json();

	const animeInfo = await fetch(`https://consument-psi.vercel.app/meta/anilist/${searchTerm}`);
	const res = await animeInfo.json();
	return json(res, { status: 200 });
};
