// fetch clients from Firestore
import { fetchClients } from '$lib/firebase/firebase.client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const clients = await fetchClients();
	return { clients };
}
