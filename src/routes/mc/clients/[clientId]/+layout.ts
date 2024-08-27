/** @type {import('./$types').PageLoad} */

import { fetchCounselings, getClient } from '$lib/firebase/firebase.client';
import type { Counseling } from '$lib/types/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId } = params;
	let client = null;
	let counselings: Counseling[] = [];

	console.log('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		console.log('client =', client);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's counselings
		counselings = await fetchCounselings(clientId);
		console.log('counselings =', counselings);
	}

	return {
		props: {
			clientId,
			client,
			counselings
		}
	};
}
