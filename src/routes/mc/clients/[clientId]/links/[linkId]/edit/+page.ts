/** @type {import('./$types').PageLoad} */

import { getClient, getLink } from '$lib/firebase/firebase.client';
import type { Link } from '$lib/types/index.d';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId, linkId } = params;
	let client = null;
	let link: (Link & { id: string }) | null = null;

	console.debug('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's link by id
		link = (await getLink(clientId, linkId)) as Link & { id: string };
	}

	return {
		props: {
			client,
			link
		}
	};
}
