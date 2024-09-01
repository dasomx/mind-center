<script lang="ts">
	import { GenderType, type Client, type Link } from '$lib/types/index.d';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import CircularProgress from '@smui/circular-progress';

	import { saveLink } from '$lib/firebase/firebase.client';
	import { convertTimestampToLocaleDateISOString } from '$lib/firebase/utils';
	import { Timestamp } from 'firebase/firestore';
	import { REFER_TO } from '$lib/config';
	import ClientGeneralInfoForm from './client-general-info-form.svelte';

	/** @type {import('./$types').PageData} */
	export let client: Client;
	export let link: Link;

	let saving = false;
	let processingDate = convertTimestampToLocaleDateISOString(
		link?.processingDate ?? Timestamp.now()
	);

	async function save() {
		if (!link) return;
		try {
			saving = true;
			link.processingDate = Timestamp.fromDate(new Date(processingDate));
			await saveLink(link, client);
			window.location = `/mc/clients/${client.id}?tab=Links`;
		} catch (error) {
			console.error('Error saving link', error);
		} finally {
			saving = false;
		}
	}
</script>

<div class="container">
	{#if saving}
		<LinearProgress indeterminate />
	{/if}
	<div class="form-container">
		<h3>Link / Referral Form</h3>
		<div style="align-self: flex-end;">
			<Button variant="outlined" on:click={() => history.back()}>Close</Button>
			<Button variant="raised" disabled={saving} on:click={save}
				>{saving ? 'Saving...' : 'Save'}
				{#if saving}
					<CircularProgress style="height: 24px; width: 24px;" indeterminate />
				{/if}
			</Button>
		</div>
		<ClientGeneralInfoForm {client} />
		<div class="grid-title">Link / Referral Info</div>
		<LayoutGrid  class="grid-container">
			<Cell>
				<Textfield
					label="Processing Date"
					variant="outlined"
					bind:value={processingDate}
					type="date"
				/>
			</Cell>
			<Cell>
				<Textfield
					label="Referral Name"
					variant="outlined"
					bind:value={link.referralName}
					type="text"
				/>
			</Cell>
			<Cell>
				<Select variant="outlined" label="Referral Type" bind:value={link.referType}>
					{#each REFER_TO as option}
					<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Textfield
					label="Receptionist"
					variant="outlined"
					bind:value={link.receptionist}
					type="text"
				/>
			</Cell>
			<Cell>
				<Textfield
					label="Oraganization Name"
					variant="outlined"
					bind:value={link.organizationName}
					type="text"
				/>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Reason"
					variant="outlined"
					bind:value={link.reason}
					textarea
				/>
			</Cell>
		</LayoutGrid>

		<div style="align-self: flex-end;">
			<Button variant="outlined" on:click={() => history.back()}>Close</Button>
			<Button variant="raised" disabled={saving} on:click={save}
				>{saving ? 'Saving...' : 'Save'}
				{#if saving}
					<CircularProgress style="height: 24px; width: 24px;" indeterminate />
				{/if}
			</Button>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.form-container {
		display: flex;
		flex: 1;
		height: 100vh;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		border-radius: 4px;
	}

	:global(.grid-container) {
		width: 100%;
		border-radius: 8px;
		border: solid 1px #e0e0e0;
		background-color: #fff;
	}
	:global(.mdc-text-field) {
		width: 100%;
	}
	:global(.mdc-select) {
		width: 100%;
	}
	.grid-title {
		font-size: 1.5rem;
		height: 32px;
		align-self: stretch;
		flex-grow: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0;
		margin-top: 2.5rem;
	}
</style>
