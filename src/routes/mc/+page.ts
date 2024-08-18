// fetch clients from Firestore
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';

// fetch clients from Firestore
const fetchClients = async () => {
	const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const clients: Client[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		clients.push({ id: doc.id, ...(doc.data() as Omit<Client, 'id'>) });
	});
	return clients;
};

const fetchCounselings = async () => {
	const q = query(collection(db, 'counselings'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const counselings: Counseling[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		counselings.push({ id: doc.id, ...(doc.data() as Omit<Counseling, 'id'>) });
	});
	return counselings;
};

const fetchLinks = async () => {
	const q = query(collection(db, 'links'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const clients = await fetchClients();
	const counselings = await fetchCounselings();
	const links = await fetchLinks();
	return { clients, counselings, links };
}
