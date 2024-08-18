import { initializeFirebase } from '$lib/firebase/firebase.client';

export async function handle({ event, resolve }) {
	// console.log('Server hook', event);

	// Pass the request
	const response = await resolve(event);
	return response;
}
