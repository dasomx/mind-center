<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$lib/session';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase.client';

	import Drawer, { AppContent, Content } from '@smui/drawer';
	import List, { Item, Text, Separator } from '@smui/list';
	import Button from '@smui/button';
	import Card from '@smui/card';

	import type { LayoutData } from '../$types';
	export let data: LayoutData;

	const defaultImage = '/favicon.png';
	let loading: boolean = true;
	let loggedIn: boolean = false;
	let displayName: string = 'undefined';
	let imageUrl: string = defaultImage;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user: any = await data.getAuthUser();
		if (user) {
			console.debug('user', user);
			displayName = user.displayName;
			imageUrl = user.photoURL?.length > 0 ? user.photoURL : defaultImage;
		}
		console.debug('imageUrl', imageUrl);
		const loggedIn = !!user; // ignore emailVerified for now && user.emailVerified;
		console.debug('user', user, loggedIn);
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
			goto('/auth/login');
		}
	});
</script>

<div class="drawer-container">
	{#if loading}
		<div>Loading...</div>
	{:else}
		<Drawer>
			<Content class="menu-content">
				<List>
					<Item ripple={false}>
						<div><img src="/mclogo.svg" alt="Mind Center logo" width="166" height="24" style="margin-top:24px;margin-bottom:16px;"/></div>
					</Item>
					<div style="display:flex; height: 58px!important; margin: 8px;border-radius: 4px;border: solid 1px #e8e8e8;
					">
						{#if loggedIn}
							<div style="display:flex; flex-direction:row; align-items:center;">
								<img src={imageUrl} alt="Profile" class="profile-image" />
								<div style="display:flex; flex-direction:column;">
									<div style="text-align:start; font-weight:bolder">Hello, {displayName}</div>
									<button
										class="text-button"
										on:click={async () => {
											console.debug('logging out...');
											try {
												await signOut(auth);
											} catch (error) {
												console.error('Error signing out:', error);
											}
											session.update((cur) => {
												return {
													...cur,
													user: null,
													loggedIn: false
												};
											});
										}}>Logout</button
									>
								</div>
							</div>
						{:else}
							<Button
								on:click={async () => {
									goto('/auth/login');
								}}>Login</Button
							>
						{/if}
					</div>
					<Item href="/mc">
						<Text>Dashboard</Text>
					</Item>
					<Item href="/mc/clients">
						<Text>My Clients</Text>
					</Item>
					<!-- <Item href="/mc/counselings">
						<Text>My Counselings</Text>
					</Item>
					<Item href="/mc/links">
						<Text>Link / Refer</Text>
					</Item> -->
				</List>
			</Content>
		</Drawer>

		<AppContent class="app-content">
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
		/* position: relative; */
		display: flex;
		flex: 1;
		height: 100vh;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	:global(.menu-content) {
		width: 256px !important;
		background-color: white;
	}

	:global(.app-content) {
		flex: 1;
		width: 100%;
	}

	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100vh;
		width: 100%;
		box-sizing: border-box;
	}

	.profile-image {
		width: 40px; /* 원하는 크기로 조정 */
		height: 40px; /* 원하는 크기로 조정 */
		margin: 1px 16px 1px 16px;
		padding: 0;
		background-color: #eef7fe;
		border-radius: 50%; /* 원형으로 자르기 */
		object-fit: cover; /* 이미지가 컨테이너에 맞게 조정 */
	}

	.text-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		text-align: start;
		font-size: inherit; /* 부모 요소의 폰트 크기를 상속 */
	}

	.text-button:hover {
		color: darkblue; /* 호버 시 색상 변경 */
	}
</style>
