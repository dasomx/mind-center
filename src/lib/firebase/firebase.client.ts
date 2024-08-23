import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import {
	addDoc,
	collection,
	connectFirestoreEmulator,
	deleteDoc,
	doc,
	Firestore,
	getFirestore,
	setDoc,
	Timestamp
} from 'firebase/firestore';
import { browser } from '$app/environment';
import type { Client } from '$lib/types';

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
			connectAuthEmulator(auth, 'http://127.0.0.1:9099');
			connectFirestoreEmulator(db, 'localhost', 9080);
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

	// if the client has an id, update the client, otherwise create a new client
	let docRef = null;
	if (!client) {
		throw new Error('Client is required.');
	}
	if (client.id) {
		docRef = doc(db, 'clients', client.id);
		await setDoc(docRef, client);
	} else {
		const colRef = collection(db, 'clients');
		docRef = await addDoc(colRef, client);
	}
	return docRef.id;
};

export const deleteClient = async (clientId: string) => {
	const docRef = doc(db, 'clients', clientId);
	return await deleteDoc(docRef);
};