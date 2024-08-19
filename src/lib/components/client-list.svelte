<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination, Label } from '@smui/data-table';
	import Button from '@smui/button';
	import StatusChip from './status-chip.svelte';
	import Select, {Option} from '@smui/select';
	import IconButton from '@smui/icon-button';
	import type { Client } from '$lib/types';
	export let data: Data[] = [];
	type Data = Client & { no: number };
	let rowsPerPage = 10;
	let currentPage = 0;
	let start = currentPage * rowsPerPage;
	let end = start + rowsPerPage;
	let lastPage = Math.ceil(data.length / rowsPerPage) - 1;
</script>

<DataTable table$aria-label="People list" style="width: 100%; border: 0px">
	<Head>
		<Row>
			<Cell>No</Cell>
			<Cell>Reg Date</Cell>
			<Cell>Name</Cell>
			<Cell>Disaster</Cell>
			<Cell>Gender</Cell>
			<Cell>Age</Cell>
			<Cell>Status</Cell>
			<Cell>Sessions</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#each data as { no, regDate, name, disasterName, gender, dob, status, sessions }}
			<Row class="content-row">
				<Cell>{no}</Cell>
				<Cell>{regDate}</Cell>
				<Cell>{name}</Cell>
				<Cell>{disasterName}</Cell>
				<Cell>{gender}</Cell>
				<Cell>{dob}</Cell>
				<Cell><StatusChip status={status}/></Cell>
				<Cell>{sessions}</Cell>
				<Cell>
					<Button>Edit</Button>
					<Button>Delete</Button>
				</Cell>
			</Row>
		{/each}
	</Body>
<Pagination style="background-color: white; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;" slot="paginate">
    <svelte:fragment slot="rowsPerPage">
      <Label>Rows Per Page</Label>
      <Select variant="outlined" bind:value={rowsPerPage} noLabel>
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={100}>100</Option>
      </Select>
    </svelte:fragment>
    <svelte:fragment slot="total">
      {start + 1}-{end} of {data.length}
    </svelte:fragment>
 
    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => (currentPage = 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => currentPage--}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => currentPage++}
      disabled={currentPage === lastPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => (currentPage = lastPage)}
      disabled={currentPage === lastPage}>last_page</IconButton
    >
  </Pagination>	
</DataTable>

<style>
	:global(.header-row) {
		background-color: rgba(0, 0, 0, 0);
	}
	:global(.content-row) {
		background-color: white;
	}
</style>
