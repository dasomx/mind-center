// fetch clients from Firestore
import { fetchClients, fetchCounselings, fetchLinks } from '$lib/firebase/firebase.client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const clients = await fetchClients();
	const counselings = await fetchCounselings();
	const links = await fetchLinks();
	return { clients, counselings, links };
}
