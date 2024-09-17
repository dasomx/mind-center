/** @type {import('./$types').PageLoad} */

import { getCounseling, getClient, fetchAssessments } from '$lib/firebase/firebase.client';
import type { Assessment, Counseling } from '$lib/types/index.d';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId } = params;
	let client = null;
	let assessments: Assessment[] = [];

	console.debug('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's assessments
		assessments = await fetchAssessments(clientId);
	}

	return {
		props: {
			client,
			assessments
		}
	};
}
