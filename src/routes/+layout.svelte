<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';

	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import Button from '@smui/button';

	import type { LayoutData } from './$types';
	import Navigation from '$lib/Navigation.svelte';
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
		console.log('user', user, loggedIn);
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});

		if (!loggedIn) {
			goto('/');
		}
	});
</script>

<div class="drawer-container">
{#if loading}
	<div>Loading...</div>
{:else}	
	<Drawer>
		<Content>
			<List>
				<Item>
					{#if loggedIn}
						<Button
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
							}}>logout</Button>
					{:else}
						<Button
							on:click={async () => {
							goto('/login');
							}}>login</Button
						>
					{/if}	
				</Item>
				<Item href="/">
					<Text>Dashboard</Text>
				</Item>
				<Item href="/clients">
					<Text>My Clients</Text>
				</Item>
				<Item href="/counselings">
					<Text>My Counselings</Text>
				</Item>
				<Item href="/links">
					<Text>Link / Refer</Text>
				</Item>
			</List>
		</Content>
	</Drawer>

	<AppContent>
		<Content>
			<div class="main-content">
				<slot />
			</div>
		</Content>
	</AppContent>
{/if}	
</div>





<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */
  .drawer-container {
    position: relative;
    display: flex;
    height: 100vh;
    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }
 
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }
 
  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>