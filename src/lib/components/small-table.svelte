<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	export let data: { name: string; date: string }[] = [
		{ name: 'Ayesha', date: '15-03-2024' },
		{ name: 'Ali', date: '22-07-2023' },
		{ name: 'Zara', date: '05-11-2024' },
		{ name: 'Ahmed', date: '30-08-2023' },
		{ name: 'Fatima', date: '18-12-2024' },
		{ name: 'Hassan', date: '09-05-2024' }
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
		{#each data as { name, date }}
			<Row class="content-row">
				<Cell>{name}</Cell>
				<Cell>{date}</Cell>
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
