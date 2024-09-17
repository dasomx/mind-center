/** @type {import('./$types').PageLoad} */

import { getClient, getAssessment } from '$lib/firebase/firebase.client';
import type { Assessment } from '$lib/types/index.d';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId, assessmentId } = params;
	let client = null;
	let assessment: (Assessment & { id: string }) | null = null;

	console.debug('clientId', clientId, 'assessmentId', assessmentId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		// Get the client's assessment
		try {
			assessment = (await getAssessment(clientId, assessmentId)) as Assessment & { id: string };
			console.debug('assessment', assessment);
		} catch (error) {
			console.error('Error getting assessment', error);
		}
	}

	return {
		props: {
			client,
			assessment
		}
	};
}
