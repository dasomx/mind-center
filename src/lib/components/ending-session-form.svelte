<script lang="ts">
	import { CounselingEndingType, type Client, type EndingSession } from '$lib/types/index.d';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import LinearProgress from '@smui/linear-progress';
	import CircularProgress from '@smui/circular-progress';

	import { saveEnding, saveLink } from '$lib/firebase/firebase.client';
	import ClientGeneralInfoForm from './client-general-info-form.svelte';

	/** @type {import('./$types').PageData} */
	export let client: Client;
	export let ending: EndingSession;

	let saving = false;

	async function save() {
		if (!ending) return;
		try {
			saving = true;
			await saveEnding(ending, client);
			window.location = `/mc/clients/${client.id}?tab=Ending`;
		} catch (error) {
			console.error('Error saving ending', error);
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
		<h3>Ending Session</h3>
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
		<div class="grid-title">Ending Session Report</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Select variant="outlined" label="Ending Type" bind:value={ending.endingType}>
					{#each Object.values(CounselingEndingType) as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Treatment Ending"
					variant="outlined"
					bind:value={ending.treatmentEnding}
					textarea
				/>
			</Cell>
			<Cell span={12}>
				<Textfield label="Reason" variant="outlined" bind:value={ending.reason} textarea />
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
