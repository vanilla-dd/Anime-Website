export function formatAiringTimeInHours(timeUntilAiring: number) {
	const timeUntilAiringMs = timeUntilAiring * 1000;
	if (timeUntilAiringMs >= 86400000) {
		// If time until airing is 24 hours or more, display days remaining
		const daysUntilAiring = Math.floor(timeUntilAiringMs / 86400000); // 1 day = 86400000 milliseconds
		return `${daysUntilAiring} day(s) remaining`;
	} else {
		// Display time until airing in hours
		const hoursUntilAiring = Math.floor(timeUntilAiringMs / 3600000); // 1 hour = 3600000 milliseconds
		return `${hoursUntilAiring} hour(s) until airing`;
	}
}
// Function to format airing time as a date
export const formatAiringTimeAsDate = (airingTime: number) =>
	new Date(airingTime * 1000).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
		// hour: 'numeric'
		// timeZoneName: 'shortGeneric'
	});

export function dateFormat(
	month: number | undefined,
	year: number | undefined,
	day: number | undefined
) {
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	const date = new Date(`${month} ${day}, ${year}`);
	// Format the date using the Intl.DateTimeFormat object
	const formattedDate = dateFormatter.format(date);

	return formattedDate;
}
