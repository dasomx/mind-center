<script lang="ts">
	import type { Client } from '$lib/types';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import LinearProgress from '@smui/linear-progress';
	import { getAgeFromDOB } from '$lib/utils/common';

	export let client: Client;
	let age = getAgeFromDOB(client?.dob);
</script>

<div class="grid-title">Client Info</div>
{#if !client}
	<LinearProgress indeterminate />
{:else}
	<LayoutGrid class="grid-container">
		<Cell>
			<Textfield label="Client Name" bind:value={client.name} variant="outlined" input$readonly />
		</Cell>
		<Cell>
			<Textfield
				label="Disaster Victim Type"
				bind:value={client.disasterVictimType}
				variant="outlined"
				input$readonly
			/>
		</Cell>
		<Cell>
			<Textfield
				label="Disaster Type"
				variant="outlined"
				bind:value={client.disasterType}
				input$readonly
			/>
		</Cell>
		<Cell>
			<Textfield
				label="Age"
				variant="outlined"
				bind:value={age}
				input$style="color: red;"
				input$readonly
			/>
		</Cell>
		<Cell>
			<Textfield label="Mobile" variant="outlined" bind:value={client.mobile} input$readonly />
		</Cell>
		<Cell>
			<Textfield
				label="Home Phone"
				variant="outlined"
				bind:value={client.contactNoHome}
				input$readonly
			/>
		</Cell>
		<Cell span={12}>
			<Textfield
				label="Address"
				variant="outlined"
				bind:value={client.address}
				style="width: 100%"
				input$readonly
			/>
		</Cell>
	</LayoutGrid>
{/if}

<style>
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
