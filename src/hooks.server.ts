export async function handle({ event, resolve }) {
	console.debug('Server hook', event);

	// Pass the request
	const response = await resolve(event);
	return response;
}
