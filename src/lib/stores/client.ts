import { writable } from 'svelte/store';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase Firestore
const firebaseConfig = {
	apiKey: 'AIzaSyDzKHSGoEkwYuEaBwfP9z1UgqCqgFbc4YU',
	authDomain: 'mind-center-34f1e.firebaseapp.com',
	projectId: 'mind-center-34f1e',
	storageBucket: 'mind-center-34f1e.appspot.com',
	messagingSenderId: '218245904143',
	appId: '1:218245904143:web:a573875d5c9bd4eb9ff07a',
	measurementId: 'G-Q8Y3WW8JS2'
};

const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);

// Create a writable store
export const clientStore = writable([]);

// Subscribe to Firestore collection changes
onSnapshot(collection(db, 'clients'), (snapshot) => {
	const clients = [];
	snapshot.forEach((doc) => {
		clients.push({ id: doc.id, ...doc.data() });
	});
	clientStore.set(clients);
});
