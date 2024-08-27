// fetch counselings from Firestore
import { fetchAllCounselings } from '$lib/firebase/firebase.client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const counselings = await fetchAllCounselings();
	return { counselings };
}
