<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	let loading: boolean = true;
	let loggedIn: boolean = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user: any = await data.getAuthUser();

		const loggedIn = !!user && user.emailVerified;
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});

		if (loggedIn) {
			goto('/');
		}
	});
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div>
		Logged in: {loggedIn}
    {#if loggedIn}
      <button
        on:click={async () => {
          console.log('logging out...');
          try {
            await signOut(auth);
          } catch (error) {
            console.error('Error signing out:', error);
          }
          session.update((cur) => {
            return {
              ...cur,
              user: null,
              loggedIn: false,
            };
          });
        }}>logout</button
      >
    {:else}
      <button
        on:click={async () => {
          goto('/login');
        }}>login</button
      >
    {/if}

		<slot />
	</div>
{/if}
