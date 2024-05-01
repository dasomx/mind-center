<script lang="ts">
	// login/+page.svelte
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
	import { getDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/firebase.client';
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import FormField from '@smui/form-field';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	async function loginWithMail() {
		await signInWithEmailAndPassword(auth, email, password)
			.then(async (result) => {
				const { user }: UserCredential = result;

				// Check if the user is approved
				const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log('user doc data ', userDoc.data())
				if (userDoc.exists() && userDoc.data().approved) {
					session.set({
						loggedIn: true,
						user: {
							displayName: user?.displayName,
							email: user?.email,
							photoURL: user?.photoURL,
							uid: user?.uid
						}
					});
					goto('/');
				} else {
					errorMessage = 'Your account has not been approved yet.';
				}
			})
			.catch((error) => {
				errorMessage = error.message;
			});
	}
</script>

<div class="login-form">
	<h1>Login</h1>
	<form on:submit|preventDefault={loginWithMail}>
		<FormField>
			<TextField bind:value={email} label="Email" />
		</FormField>
		<FormField>
			<TextField bind:value={password} label="Password" type="password" />
		</FormField>
		<Button type="submit" variant="unelevated">Login</Button>
	</form>

	{#if errorMessage}
		<p>{errorMessage}</p>
	{/if}

	<div>Don't you have an account? <a href="/register"> Register</a></div>
</div>
