// fetch clients from Firestore
import { fetchClients, fetchAllCounselings, fetchAllLinks } from '$lib/firebase/firebase.client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const clients = await fetchClients();
	const counselings = await fetchAllCounselings();
	const links = await fetchAllLinks();
	return { clients, counselings, links };
}
