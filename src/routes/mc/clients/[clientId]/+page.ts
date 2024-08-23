/** @type {import('./$types').PageLoad} */

import { auth, db } from '$lib/firebase/firebase.client';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

export async function load({ params }) {
	const { clientId } = params;
	let client = null;

	console.log('clientId', clientId);

	if (clientId) {
		// Get the client
		const docRef = doc(db, 'clients', clientId);
		const clientDoc = await getDoc(docRef);

		if (!clientDoc.exists()) {
			error(404, 'Client not found');
		}
		client = { id: clientDoc.id, ...clientDoc.data() };
		console.log(client);
	}

	return {
		props: {
			clientId,
			client
		}
	};
}
