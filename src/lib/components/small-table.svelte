<script lang="ts">
	import { convertTimestampToDateString } from '$lib/firebase/utils';
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Timestamp } from 'firebase/firestore';
	export let data: { name: string; createdAt: Timestamp }[] = [
		{ name: 'Ayesha', createdAt: Timestamp.fromDate(new Date('15-03-2024')) },
		{ name: 'Ali', createdAt: Timestamp.fromDate(new Date('22-07-2023')) },
		{ name: 'Zara', createdAt: Timestamp.fromDate(new Date('05-11-2024')) },
		{ name: 'Ahmed', createdAt: Timestamp.fromDate(new Date('30-08-2023')) },
		{ name: 'Fatima', createdAt: Timestamp.fromDate(new Date('18-12-2024')) },
		{ name: 'Hassan', createdAt: Timestamp.fromDate(new Date('09-05-2024')) }
	];
</script>

<DataTable table$aria-label="People list" style="width: 100%; border: 0px">
	<Head>
		<Row>
			<Cell>Name</Cell>
			<Cell>Date</Cell>
		</Row>
	</Head>
	<Body>
		{#each data as { name, createdAt }}
			<Row class="content-row">
				<Cell>{name}</Cell>
				<Cell>{convertTimestampToDateString(createdAt)}</Cell>
			</Row>
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
