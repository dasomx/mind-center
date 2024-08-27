import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import {
	addDoc,
	collection,
	collectionGroup,
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
	Timestamp,
	where
} from 'firebase/firestore';
import { browser } from '$app/environment';
import type {
	Client,
	ClientSearchCriteria,
	Counseling,
	CounselingSearchCriteria,
	Link
} from '$lib/types';
import { cleanObject } from './utils';

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

/**
 * Client CRUD
 */

export const saveClient = async (client: Client) => {
	console.debug('DB: saveClient');
	// covert the client object to fit the firestore schema
	// undefiend values are not allowed in firestore
	cleanObject(client);

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
	console.debug('DB: deleteClient');
	const docRef = doc(db, 'clients', clientId);
	return await deleteDoc(docRef);
};

export const getClient = async (clientId: string) => {
	console.debug('DB: getClient', db === undefined || db === null);
	const docRef = doc(db, 'clients', clientId);
	const clientDoc = await getDoc(docRef);
	return clientDoc.exists() ? { id: clientDoc.id, ...clientDoc.data() } : null;
};

// fetch clients from Firestore
export const fetchClients = async () => {
	console.debug('DB: fetchClients');
	const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const clients: Client[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		clients.push({ id: doc.id, ...(doc.data() as Omit<Client, 'id'>) });
	});
	return clients;
};

export const searchClients = async (criteria: ClientSearchCriteria) => {
	console.debug('DB: searchClients');
	let q = query(collection(db, 'clients'));
	if (criteria.name) {
		q = query(q, where('name', '==', criteria.name));
	}
	if (criteria.mobile) {
		q = query(q, where('mobile', '==', criteria.mobile));
	}
	if (criteria.disasterName) {
		q = query(q, where('disasterName', '==', criteria.disasterName));
	}
	const querySnapshot = await getDocs(q);
	const clients: Client[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		clients.push({ id: doc.id, ...(doc.data() as Omit<Client, 'id'>) });
	});
	return clients;
};

/**
 * Counseling CRUD
 */

export const saveCounseling = async (counseling: Counseling, client: Client) => {
	console.debug('DB: saveCounseling');
	cleanObject(counseling);
	// populate the client information to the counseling
	counseling.createdAt = counseling.createdAt || Timestamp.now();
	counseling.updatedAt = Timestamp.now();
	counseling.clientId = client.id;
	counseling.clientName = client.name;
	counseling.clientMobile = client.mobile;
	counseling.disasterName = client.disasterName;
	counseling.disasterType = client.disasterType;
	counseling.disasterVictimType = client.disasterVictimType;
	const clientId = client.id;
	const { id, ...rest } = counseling;

	// if the counseling has an id, update the counseling, otherwise create a new counseling
	let docRef = null;
	if (!counseling) {
		throw new Error('Counseling is required.');
	}

	if (!clientId) {
		throw new Error('Client ID is required.');
	}

	if (id) {
		docRef = doc(db, `clients/${clientId}/counselings`, id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, `clients/${clientId}/counselings`);
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteCounseling = async (clientId: string, counselingId: string) => {
	console.debug('DB: deleteCounseling');
	const docRef = doc(db, `clients/${clientId}/counselings`, counselingId);
	return await deleteDoc(docRef);
};

export const getCounseling = async (clientId: string, counselingId: string) => {
	console.debug('DB: getCounseling');
	const docRef = doc(db, `clients/${clientId}/counselings`, counselingId);
	const counselingDoc = await getDoc(docRef);
	return counselingDoc.exists() ? { id: counselingDoc.id, ...counselingDoc.data() } : null;
};

export const fetchCounselings = async (clientId: string) => {
	console.debug('DB: fetchCounselings');
	const q = query(
		collection(db, `clients/${clientId}/counselings`),
		orderBy('createdAt', 'desc'),
		limit(5)
	);
	const querySnapshot = await getDocs(q);
	const counselings: Counseling[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		counselings.push({ id: doc.id, ...(doc.data() as Omit<Counseling, 'id'>) });
	});
	return counselings;
};

export const fetchAllCounselings = async () => {
	console.debug('DB: fetchAllCounselings');
	const q = query(collectionGroup(db, 'counselings'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const counselings: Counseling[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		counselings.push({ id: doc.id, ...(doc.data() as Omit<Counseling, 'id'>) });
	});
	return counselings;
};

export const searchCounseling = async (criteria: CounselingSearchCriteria) => {
	console.debug('DB: searchCounseling');
	let q = query(collectionGroup(db, 'counselings'));
	if (criteria.name) {
		q = query(q, where('name', '==', criteria.name));
	}
	if (criteria.mobile) {
		q = query(q, where('mobile', '==', criteria.mobile));
	}
	if (criteria.disasterName) {
		q = query(q, where('disasterName', '==', criteria.disasterName));
	}
	const querySnapshot = await getDocs(q);
	const counselings: Counseling[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		counselings.push({ id: doc.id, ...(doc.data() as Omit<Counseling, 'id'>) });
	});
	return counselings;
};

/**
 * Link CRUD
 */

export const fetchLinks = async (clientId: string) => {
	console.debug('DB: fetchLinks');
	const q = query(
		collection(db, `clients/${clientId}/links`),
		orderBy('createdAt', 'desc'),
		limit(5)
	);
	const querySnapshot = await getDocs(q);
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};

export const fetchAllLinks = async () => {
	console.debug('DB: fetchAllLinks');
	const q = query(collectionGroup(db, 'links'), orderBy('createdAt', 'desc'), limit(5));
	const querySnapshot = await getDocs(q);
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};
