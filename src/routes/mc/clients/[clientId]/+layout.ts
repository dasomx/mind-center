/** @type {import('./$types').PageLoad} */

import {
	fetchAssessments,
	fetchCounselings,
	fetchEndings,
	fetchLinks,
	getClient
} from '$lib/firebase/firebase.client';
import type { Assessment, Counseling, EndingSession, Link } from '$lib/types/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { clientId } = params;
	let client = null;
	let counselings: Counseling[] = [];
	let links: Link[] = [];
	let endings: EndingSession[] = [];
	let assessments: Assessment[] = [];

	console.debug('clientId', clientId);

	if (clientId) {
		// Get the client
		client = await getClient(clientId);
		if (!client) {
			error(404, 'Client not found');
		}
		assessments = await fetchAssessments(clientId);
		assessments = assessments.map((assessment, index) => {
			return {
				...assessment,
				no: index + 1
			};
		});
		// Get the client's counselings
		counselings = await fetchCounselings(clientId);
		counselings = counselings.map((counseling, index) => {
			return {
				...counseling,
				no: index + 1
			};
		});
		links = await fetchLinks(clientId);
		links = links.map((link, index) => {
			return {
				...link,
				no: index + 1
			};
		});
		endings = await fetchEndings(clientId);
		endings = endings.map((ending, index) => {
			return {
				...ending,
				no: index + 1
			};
		});
	}

	return {
		props: {
			clientId,
			client,
			assessments,
			counselings,
			links,
			endings
		}
	};
}
