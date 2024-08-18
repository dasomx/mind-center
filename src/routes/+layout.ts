/** @type {import('./$types').LayoutLoad} */

import { initializeFirebase, auth } from '$lib/firebase/firebase.client';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';

export async function load({ url }) {
	initializeFirebase();

	function getAuthUser() {
		return new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => resolve(user ? user : false));
		});
	}

	return {
		getAuthUser: getAuthUser,
		url: url.pathname
	};
}
