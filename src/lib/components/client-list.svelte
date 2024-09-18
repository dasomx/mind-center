<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination, Label } from '@smui/data-table';
	import StatusChip from './status-chip.svelte';
	import Select, {Option} from '@smui/select';
	import IconButton from '@smui/icon-button';
	  import Dialog, { Title, Content, Actions } from '@smui/dialog';
	  import Button from '@smui/button';


	import type { Client } from '$lib/types';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/config';
	import { convertTimestampToDateString } from '$lib/firebase/utils';
	import { countCounselings, deleteClient } from '$lib/firebase/firebase.client';
	import { getAgeFromDOB } from '$lib/utils/common';

	export let data: Data[] = [];
	type Data = Client & { no: number };
	let rowsPerPage = 10;
	let currentPage = 0;
	let start = currentPage * rowsPerPage;
	let end = start + rowsPerPage;
	let lastPage = Math.ceil(data.length / rowsPerPage) - 1;

	  let open = false;
	  let clicked = 'Nothing yet.';

	  let selectedId: string | null = null;

	async function removeClient() {
		try {
			if (!selectedId) return;
			await deleteClient(selectedId);
			console.debug('Client deleted successfully');
			data = data.filter(client => client.id !== selectedId);
		} catch (error) {
			console.error('Error deleting client', error);
		} finally {
			open = false;
			selectedId = null;
		}
	}
</script>


<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Delete permanately</Title>
  <Content id="simple-content">Are you sure?</Content>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => removeClient()}>
      <Label>Delete</Label>
    </Button>
  </Actions>
</Dialog>


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
		{#each data as { id, no, createdAt, name, disasterName, gender, dob, status, sessions }}
			<Row class="content-row">
				<Cell>{no}</Cell>
				<Cell>{convertTimestampToDateString(createdAt)}</Cell>
				<Cell  on:click={()=> {
					goto(`${routes.clients}/${id}`)}
				}>{name}</Cell>
				<Cell>{disasterName}</Cell>
				<Cell>{gender}</Cell>
				<Cell>{getAgeFromDOB(dob)}</Cell>
				<Cell><StatusChip status={status}/></Cell>
				{#await countCounselings(id) then cnt}
					<Cell>{cnt}</Cell>
					{#if cnt > 0}
						<Cell>
							<Button on:click={()=>goto(`${routes.clients}/${id}`)}>Show</Button>
							<Button on:click={()=>{
								alert("First delete all counseling sessions!")
							}}>Delete</Button>
						</Cell>
					{:else}
						<Cell>
							<Button on:click={()=>goto(`${routes.clients}/${id}`)}>Show</Button>
							<Button on:click={()=>{
								open = true; ;
								selectedId = id;
							}}>Delete</Button>
						</Cell>
					{/if}
				{/await}
				
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

<!-- Warning before deleting a session -->
<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Warning</Title>
  <Content id="simple-content">The Client will be deleted. Would you like to continue?</Content>
  <Actions>
    <Button>
      <Label>No</Label>
    </Button>
    <Button on:click={() => {
		removeClient();
	}}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>
<!-- End: Warning before deleting a session -->

<style>
	:global(.header-row) {
		background-color: rgba(0, 0, 0, 0);
	}
	:global(.content-row) {
		background-color: white;
	}
</style>
