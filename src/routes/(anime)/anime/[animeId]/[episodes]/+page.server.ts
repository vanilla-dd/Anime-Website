import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const type = 'sub';
	const epNo = Number(url.searchParams.get('epNo'));
	const ep = Number(url.searchParams.get('ep'));
	async function getEpisodes() {
		const data =
			await fetch(`https://consument-psi.vercel.app/meta/anilist/info/${params.animeId}?provider=zoro
		`);
		const { episodes, id } = await data.json();
		return {
			episodes: episodes,
			id: id as string,
			title: episodes ? (episodes[epNo] ? episodes[epNo].title : '') : ''
		};
	}
	const animeWatch = async () => {
		const data = await fetch(
			encodeURIComponent(
				`https://api.anify.tv/sources?providerId=zoro&watchId=/watch/${params.episodes}${
					ep ? `?ep=${ep}` : ''
				}&episodeNumber=${epNo}&id=${params.animeId}&subType=${type}`
			)
		);
		const { sources, intro, outro, subtitles, error } = await data.json();
		return { sources, intro, outro, subtitles, error };
	};
	return {
		animeWatch: animeWatch(),
		episodesList: getEpisodes(),
		epNo
	};
};
