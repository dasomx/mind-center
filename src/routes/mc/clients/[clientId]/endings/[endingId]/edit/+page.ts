/** @type {import('./$types').PageLoad} */

import { getClient, getEnding, getLink } from '$lib/firebase/firebase.client';
import type { EndingSession, Link } from '$lib/types/index.d';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId, endingId } = params;
	let client = null;
	let ending: (EndingSession & { id: string }) | null = null;

	console.debug('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's ending by id
		ending = (await getEnding(clientId, endingId)) as EndingSession & { id: string };
	}

	return {
		props: {
			client,
			ending
		}
	};
}
