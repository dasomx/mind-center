<script lang="ts">
	// login/+page.svelte
	import { session } from '$lib/session';
	import { auth, db } from '$lib/firebase/firebase.client';
	import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
	import { collection, query, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import FormField from '@smui/form-field';
	import Paper from '@smui/paper';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	async function loginWithMail() {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			const { user }: UserCredential = result;

			try {
				// Check if the user is approved
				const userDocRef = doc(db, 'users', user?.uid);
				const userDoc = await getDoc(userDocRef);

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
					goto('/mc');
				} else {
					errorMessage = 'Your account has not been approved yet.';
				}
			} catch (error) {
				console.error(error);
				errorMessage = 'Your account has not been approved yet.';
			}
		} catch (error: any) {
			errorMessage = error.message;
		}
	}
</script>

<div class="container">
	<Paper class="login-container">
		<div class="login-form">
			<div><img src="/mclogo.svg" alt="Mind Center logo" width="194" height="28" style="margin-bottom:40px"/></div>
			<TextField
				variant="outlined"
				bind:value={email}
				label="Email"
				class="login-textfield"
				style="margin-bottom: 24px"
			/>
			<TextField
				variant="outlined"
				bind:value={password}
				label="Password"
				type="password"
				class="login-textfield"
			/>
			<form on:submit|preventDefault={loginWithMail} style="width: 100%">
				<Button class="login-button" type="submit" variant="unelevated" on:click={()=>errorMessage = undefined}>Login</Button>
			</form>
			<div style="display:flex; width:100%; justify-content:space-around">
				<Button variant="text">FORGOT PASSWORD</Button>
				<Button variant="text">HELP</Button>
			</div>
			{#if errorMessage}
				<p class="error-message">{errorMessage}</p>
			{/if}
		</div>
	</Paper>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
	}

	:global(.login-container) {
		width: 400px !important;
		height: 412px;
		padding: 40px;
		border-radius: 8px !important;
		border: solid 1px #e0e0e0;
		background-color: white !important;
	}

	:global(.login-form) {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	:global(.login-textfield) {
		width: 100%;
		height: 56px;
		padding-left: 16px !important;
	}

	:global(.login-button) {
		width: 100%;
		height: 42px;
		margin-top: 24px;
		margin-bottom: 32px;
	}
	.error-message {
        color: red; /* 경고 색상으로 지정 */
    }
</style>
