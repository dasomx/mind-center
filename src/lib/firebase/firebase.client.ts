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
	Assessment,
	AssessmentSearchCriteria,
	Client,
	ClientSearchCriteria,
	Counseling,
	CounselingSearchCriteria,
	EndingSearchCriteria,
	EndingSession,
	Link,
	LinkSearchCriteria,
	Memo,
	MemoSearchCriteria
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
	const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'), limit(25));
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
 * Assessment CRUD
 */

export const saveAssessment = async (memo: Memo, client: Client) => {
	console.debug('DB: saveMemo');
	cleanObject(memo);
	// populate the ending session information to the ending
	memo.createdAt = memo.createdAt ?? Timestamp.now();
	memo.updatedAt = Timestamp.now();
	memo.clientId = client.id;
	const clientId = client.id;
	const { id, ...rest } = memo;

	// if the memo has an id, update the memo, otherwise create a new memo
	let docRef = null;
	if (!memo) {
		throw new Error('Memo is required.');
	}

	if (!clientId) {
		throw new Error('Client ID is required.');
	}

	if (id) {
		docRef = doc(db, `clients/${clientId}/memos`, id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, `clients/${clientId}/memos`);
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteAssessment = async (clientId: string, assessmentId: string) => {
	console.debug('DB: deleteAssessment');
	const docRef = doc(db, `clients/${clientId}/assessments`, assessmentId);
	return await deleteDoc(docRef);
};

export const getAssessment = async (clientId: string, assessmentId: string) => {
	console.debug('DB: getAssessment');
	const docRef = doc(db, `clients/${clientId}/assessments`, assessmentId);
	const theDoc = await getDoc(docRef);
	return theDoc.exists() ? { id: theDoc.id, ...theDoc.data() } : null;
};

export const fetchAssessments = async (clientId: string) => {
	console.debug('DB: fetchAssessment');
	const q = query(
		collection(db, `clients/${clientId}/assessments`),
		orderBy('createdAt', 'desc'),
		limit(25)
	);
	const querySnapshot = await getDocs(q);
	const items: Assessment[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		items.push({ id: doc.id, ...(doc.data() as Omit<Assessment, 'id'>) });
	});
	return items;
};

export const fetchAllAssessments = async () => {
	console.debug('DB: fetchAllAssessments');
	const q = query(collectionGroup(db, 'assessments'), orderBy('createdAt', 'desc'), limit(25));
	const querySnapshot = await getDocs(q);
	const items: Assessment[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		items.push({ id: doc.id, ...(doc.data() as Omit<Assessment, 'id'>) });
	});
	return items;
};

export const searchAssessment = async (criteria: AssessmentSearchCriteria) => {
	console.debug('DB: searchAssessment');
	let q = query(collectionGroup(db, 'assessments'));
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
	const items: Assessment[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		items.push({ id: doc.id, ...(doc.data() as Omit<Assessment, 'id'>) });
	});
	return items;
};

/**
 * Counseling CRUD
 */

export const saveCounseling = async (counseling: Counseling, client: Client) => {
	console.debug('DB: saveCounseling');
	cleanObject(counseling);
	// populate the client information to the counseling
	counseling.createdAt = counseling.createdAt ?? Timestamp.now();
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
		limit(25)
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
	const q = query(collectionGroup(db, 'counselings'), orderBy('createdAt', 'desc'), limit(25));
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

export const saveLink = async (link: Link, client: Client) => {
	console.debug('DB: saveLink');
	cleanObject(link);
	// populate the client information to the link
	link.createdAt = link.createdAt ?? Timestamp.now();
	link.updatedAt = Timestamp.now();
	link.clientId = client.id;
	const clientId = client.id;
	const { id, ...rest } = link;

	// if the link has an id, update the link, otherwise create a new link
	let docRef = null;
	if (!link) {
		throw new Error('Link is required.');
	}

	if (!clientId) {
		throw new Error('Client ID is required.');
	}

	if (id) {
		docRef = doc(db, `clients/${clientId}/links`, id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, `clients/${clientId}/links`);
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteLink = async (clientId: string, linkId: string) => {
	console.debug('DB: deleteLink');
	const docRef = doc(db, `clients/${clientId}/links`, linkId);
	return await deleteDoc(docRef);
};

export const getLink = async (clientId: string, linkId: string) => {
	console.debug('DB: getLink');
	const docRef = doc(db, `clients/${clientId}/links`, linkId);
	const linkDoc = await getDoc(docRef);
	return linkDoc.exists() ? { id: linkDoc.id, ...linkDoc.data() } : null;
};

export const fetchLinks = async (clientId: string) => {
	console.debug('DB: fetchLinks');
	const q = query(
		collection(db, `clients/${clientId}/links`),
		orderBy('createdAt', 'desc'),
		limit(25)
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
	const q = query(collectionGroup(db, 'links'), orderBy('createdAt', 'desc'), limit(25));
	const querySnapshot = await getDocs(q);
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};

export const searchLink = async (criteria: LinkSearchCriteria) => {
	console.debug('DB: searchLink');
	let q = query(collectionGroup(db, 'links'));
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
	const links: Link[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		links.push({ id: doc.id, ...(doc.data() as Omit<Link, 'id'>) });
	});
	return links;
};

/**
 * Ending Session CRUD
 */

export const saveEnding = async (ending: EndingSession, client: Client) => {
	console.debug('DB: saveEnding');
	cleanObject(ending);
	// populate the ending session information to the ending
	ending.createdAt = ending.createdAt ?? Timestamp.now();
	ending.updatedAt = Timestamp.now();
	ending.clientId = client.id;
	const clientId = client.id;
	const { id, ...rest } = ending;

	// if the ending has an id, update the ending, otherwise create a new ending
	let docRef = null;
	if (!ending) {
		throw new Error('Ending is required.');
	}

	if (!clientId) {
		throw new Error('Client ID is required.');
	}

	if (id) {
		docRef = doc(db, `clients/${clientId}/endings`, id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, `clients/${clientId}/endings`);
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteEnding = async (clientId: string, endingId: string) => {
	console.debug('DB: deleteEnding');
	const docRef = doc(db, `clients/${clientId}/endings`, endingId);
	return await deleteDoc(docRef);
};

export const getEnding = async (clientId: string, endingId: string) => {
	console.debug('DB: getEnding');
	const docRef = doc(db, `clients/${clientId}/endings`, endingId);
	const endingDoc = await getDoc(docRef);
	return endingDoc.exists() ? { id: endingDoc.id, ...endingDoc.data() } : null;
};

export const fetchEndings = async (clientId: string) => {
	console.debug('DB: fetchEndings');
	const q = query(
		collection(db, `clients/${clientId}/endings`),
		orderBy('createdAt', 'desc'),
		limit(25)
	);
	const querySnapshot = await getDocs(q);
	const endings: EndingSession[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		endings.push({ id: doc.id, ...(doc.data() as Omit<EndingSession, 'id'>) });
	});
	return endings;
};

export const fetchAllEndings = async () => {
	console.debug('DB: fetchAllEndings');
	const q = query(collectionGroup(db, 'endings'), orderBy('createdAt', 'desc'), limit(25));
	const querySnapshot = await getDocs(q);
	const endings: EndingSession[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		endings.push({ id: doc.id, ...(doc.data() as Omit<EndingSession, 'id'>) });
	});
	return endings;
};

export const searchEnding = async (criteria: EndingSearchCriteria) => {
	console.debug('DB: searchEnding');
	let q = query(collectionGroup(db, 'endings'));
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
	const endings: EndingSession[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		endings.push({ id: doc.id, ...(doc.data() as Omit<EndingSession, 'id'>) });
	});
	return endings;
};

/**
 * Memo CRUD
 */

export const saveMemo = async (memo: Memo, client: Client) => {
	console.debug('DB: saveMemo');
	cleanObject(memo);
	// populate the ending session information to the ending
	memo.createdAt = memo.createdAt ?? Timestamp.now();
	memo.updatedAt = Timestamp.now();
	memo.clientId = client.id;
	const clientId = client.id;
	const { id, ...rest } = memo;

	// if the memo has an id, update the memo, otherwise create a new memo
	let docRef = null;
	if (!memo) {
		throw new Error('Memo is required.');
	}

	if (!clientId) {
		throw new Error('Client ID is required.');
	}

	if (id) {
		docRef = doc(db, `clients/${clientId}/memos`, id);
		await setDoc(docRef, rest);
	} else {
		const colRef = collection(db, `clients/${clientId}/memos`);
		docRef = await addDoc(colRef, rest);
	}
	return docRef.id;
};

export const deleteMemo = async (clientId: string, memoId: string) => {
	console.debug('DB: deleteMemo');
	const docRef = doc(db, `clients/${clientId}/memos`, memoId);
	return await deleteDoc(docRef);
};

export const getMemo = async (clientId: string, memoId: string) => {
	console.debug('DB: getMemo');
	const docRef = doc(db, `clients/${clientId}/memos`, memoId);
	const endingDoc = await getDoc(docRef);
	return endingDoc.exists() ? { id: endingDoc.id, ...endingDoc.data() } : null;
};

export const fetchMemos = async (clientId: string) => {
	console.debug('DB: fetchMemos');
	const q = query(
		collection(db, `clients/${clientId}/memos`),
		orderBy('createdAt', 'desc'),
		limit(25)
	);
	const querySnapshot = await getDocs(q);
	const memos: Memo[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		memos.push({ id: doc.id, ...(doc.data() as Omit<Memo, 'id'>) });
	});
	return memos;
};

export const fetchAllMemos = async () => {
	console.debug('DB: fetchAllMemos');
	const q = query(collectionGroup(db, 'memos'), orderBy('createdAt', 'desc'), limit(25));
	const querySnapshot = await getDocs(q);
	const memos: Memo[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		memos.push({ id: doc.id, ...(doc.data() as Omit<Memo, 'id'>) });
	});
	return memos;
};

export const searchMemo = async (criteria: MemoSearchCriteria) => {
	console.debug('DB: searchMemo');
	let q = query(collectionGroup(db, 'memos'));
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
	const memos: Memo[] = [];
	querySnapshot.forEach((doc) => {
		// prettier-ignore
		memos.push({ id: doc.id, ...(doc.data() as Omit<Memo, 'id'>) });
	});
	return memos;
};




