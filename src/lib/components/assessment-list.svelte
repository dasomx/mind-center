<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination, Label } from '@smui/data-table';
	import Button from '@smui/button';
	import StatusChipCounseling from './status-chip-counseling.svelte';
	import Select, {Option} from '@smui/select';
	import IconButton from '@smui/icon-button';
	import type { Counseling, Client } from '$lib/types';
	import { convertTimestampToDateString } from '$lib/firebase/utils';
	import { goto } from '$app/navigation';
	import { deleteCounseling } from '$lib/firebase/firebase.client';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	export let data: Data[] = [];
	type Data = Counseling & { no: number };
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
			<Cell>Date</Cell>
			<Cell>Name</Cell>
			<Cell>Disaster Name</Cell>
			<Cell>Type</Cell>
			<Cell>Form</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#each data as { no, createdAt, clientId, id, startTime, clientName, disasterName, counselingType, assessment }}
		  {#if assessment !=null}
			<Row class="content-row">
				<Cell>{no}</Cell>
				<Cell>{convertTimestampToDateString(createdAt)}</Cell>
				<Cell>{clientName}</Cell>
				<Cell>{disasterName}</Cell>
				<Cell>{counselingType}</Cell>
				<Cell>{JSON.parse(assessment)[0].options}</Cell>
				{#if JSON.parse(assessment)[0].options =="ADULT"}
					<Cell>
						<Button on:click={()=>goto(`/mc/clients/${clientId}/counselings/${id}/assessment?type=ADULT`)}>Edit</Button>
					</Cell>
					
				{:else if JSON.parse(assessment)[0].options =="CHILD"}
					<Cell>
						<Button on:click={()=>goto(`/mc/clients/${clientId}/counselings/${id}/assessment?type=CHILD`)}>Edit</Button>
					</Cell>
				{/if}
			</Row>
		  {/if}
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