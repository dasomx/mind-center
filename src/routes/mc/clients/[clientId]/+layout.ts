/** @type {import('./$types').PageLoad} */

import { getClient } from '$lib/firebase/firebase.client';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId } = params;
	let client = null;

	console.log('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		console.log('client =', client);
		if (!client) {
			error(404, 'Client not found');
		}
	}

	return {
		props: {
			clientId,
			client
		}
	};
}
