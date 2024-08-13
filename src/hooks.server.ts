export async function handle({ event, resolve }) {
	// Initialize Firebase
	// initializeFirebase();
	console.log('Server hook', event);

	// Pass the request
	const response = await resolve(event);
	return response;
}
