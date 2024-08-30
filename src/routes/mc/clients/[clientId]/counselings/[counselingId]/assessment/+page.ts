/** @type {import('./$types').PageLoad} */

import { getCounseling, getClient } from '$lib/firebase/firebase.client';
import type { Counseling } from '$lib/types/index.d';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId, counselingId } = params;
	let client = null;
	let counseling: (Counseling & { id: string }) | null = null;

	console.debug('clientId', clientId);

	
	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's counselings
		counseling = (await getCounseling(clientId, counselingId)) as Counseling & { id: string };
	}

	return {
		props: {
			client,
			counseling
		}
	};
}
