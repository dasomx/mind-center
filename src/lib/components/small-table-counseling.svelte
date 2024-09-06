<script lang="ts">
	import { goto } from '$app/navigation';
	import { convertTimestampToDateString } from '$lib/firebase/utils';
	import Button from '@smui/button';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Timestamp } from 'firebase/firestore';
	export let data: { id: string; clientId: string; clientName: string; createdAt: Timestamp }[] = [
		{ id: '123', clientId:'1', clientName: 'Ayesha', status: '', createdAt: Timestamp.fromDate(new Date('15-03-2024')) },
		{ id: '234', clientId:'2', clientName: 'Ali', createdAt: Timestamp.fromDate(new Date('22-07-2023')) },
		{ id: '345', clientId:'3', clientName: 'Zara', createdAt: Timestamp.fromDate(new Date('05-11-2024')) },
		{ id: '456', clientId:'4', clientName: 'Ahmed', createdAt: Timestamp.fromDate(new Date('30-08-2023')) },
		{ id: '567', clientId:'5', clientName: 'Fatima', createdAt: Timestamp.fromDate(new Date('18-12-2024')) },
		{ id: '678', clientId:'6', clientName: 'Hassan', createdAt: Timestamp.fromDate(new Date('09-05-2024')) }
	];
	// export let resource: 'clients' | 'counselings' | 'links';
</script>

<DataTable table$aria-label="People list" style="width: 100%; border: 0px">
	<Head>
		<Row>
			<Cell>Name</Cell>
			<Cell>Date</Cell>
		</Row>
	</Head>
	<Body>
		{#each data as { id, clientId, clientName, status, createdAt }}
		  {#if status == 'Planned'}
			<Row
				class="content-row"
				style="cursor: pointer"
				on:click={() => {
					goto(`/mc/clients/${clientId}/counselings/${id}/edit`);
				}}
			>
				<Cell>
					{clientName}
				</Cell>
				<Cell>{convertTimestampToDateString(createdAt)}</Cell>
			</Row>
		  {/if}
		{/each}
	</Body>
</DataTable>

<style>
	:global(.header-row) {
		background-color: rgba(0, 0, 0, 0);
	}
	:global(.content-row) {
		background-color: white;
	}
</style>
