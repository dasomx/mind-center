import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import {
	addDoc,
	collection,
	connectFirestoreEmulator,
	deleteDoc,
	doc,
	Firestore,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	Timestamp
} from 'firebase/firestore';
import { browser } from '$app/environment';
import type { Client, Counseling, Link } from '$lib/types';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
	useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true'
};

export const initializeFirebase = () => {
	console.debug('initializeFirebase');
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		db = getFirestore(app);

		if (firebaseConfig.useEmulator) {
			const emulatorHost = import.meta.env.VITE_FIREBASE_EMULATOR_HOST ?? 'localhost';
			const emulatorAuthUrl =
				import.meta.env.VITE_FIREBASE_EMULATOR_AUTH_URL ?? 'http://127.0.0.1:9099';
			connectAuthEmulator(auth, emulatorAuthUrl);
			connectFirestoreEmulator(db, emulatorHost, 9080);
		}
	}
};

export const saveClient = async (client: Client) => {
	// covert the client object to fit the firestore schema
	// undefiend values are not allowed in firestore
	Object.keys(client).forEach((key) => {
		if (client[key] === '' || client[key] === undefined) {
			client[key] = null;
		}
	});

	client.createdAt = client.createdAt || Timestamp.now();
	client.updatedAt = Timestamp.now();
	const { id, ...rest } = client;

	// if the client has an id, update the client, otherwise create a new client
	let docRef = null;
	if (!client) {
		throw new Error('Client is required.');
	}
	if (id) {
		docRef = doc(db, 'clients', id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, 'clients');
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteClient = async (clientId: string) => {
	const docRef = doc(db, 'clients', clientId);
	return await deleteDoc(docRef);
};

export const getClient = async (clientId: string) => {
	const docRef = doc(db, 'clients', clientId);
	const clientDoc = await getDoc(docRef);
	return clientDoc.exists() ? { id: clientDoc.id, ...clientDoc.data() } : null;
};

// fetch clients from Firestore
export const fetchClients = async () => {
	const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const clients: Client[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		clients.push({ id: doc.id, ...(doc.data() as Omit<Client, 'id'>) });
	});
	return clients;
};

export const fetchCounselings = async () => {
	const q = query(collection(db, 'counselings'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const counselings: Counseling[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		counselings.push({ id: doc.id, ...(doc.data() as Omit<Counseling, 'id'>) });
	});
	return counselings;
};

export const fetchLinks = async () => {
	const q = query(collection(db, 'links'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};