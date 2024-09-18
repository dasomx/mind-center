<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination, Label } from '@smui/data-table';
	import Button from '@smui/button';
	import StatusChipCounseling from './status-chip-counseling.svelte';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import type { Counseling, Client, Assessment } from '$lib/types';
	import { convertTimestampToDateString } from '$lib/firebase/utils';
	import { goto } from '$app/navigation';
	import { deleteAssessment } from '$lib/firebase/firebase.client';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import { numberOfAnswersAssessment, scoreAssessment } from '$lib/utils/assessment';
	export let data: Data[] = [];
	type Data = Assessment & { no: number };
	let rowsPerPage = 10;
	let currentPage = 0;
	let start = currentPage * rowsPerPage;
	let end = start + rowsPerPage;
	let lastPage = Math.ceil(data.length / rowsPerPage) - 1;
	let open = false;
	let delClientId: String = '';
	let delId: String = '';

	async function removeAssessment(clientId: string, id: string) {
		try {
			await deleteAssessment(clientId, id);
			console.debug('Assessment deleted successfully');
			data = data.filter(item => item.id !== id);
		} catch (error) {
			console.error('Error deleting assessment', error);
		}
	}

</script>

<DataTable table$aria-label="People list" style="width: 100%; border: 0px">
	<Head>
		<Row>
			<Cell>No</Cell>
			<Cell>Date</Cell>
			<Cell>Form</Cell>
			<Cell>Answered</Cell>
			<Cell>Score</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#each data as { no, createdAt, clientId, id, respond }}
			{#if respond != null}
				<Row class="content-row">
					<Cell>{no}</Cell>
					<Cell>{convertTimestampToDateString(createdAt)}</Cell>
					<Cell>{respond[0].text}</Cell>
					<Cell>{numberOfAnswersAssessment(respond)}</Cell>
					<Cell>{scoreAssessment(respond)}</Cell>
					<Cell>
						<Button
							on:click={() =>
								goto(`/mc/clients/${clientId}/assessments/${id}/edit?type=${respond[0].options}`)}
							>Edit</Button
						>
						<Button on:click={()=>{
							open = true; 
							delClientId = clientId;
							delId = id;
						}}>Delete</Button>						
					</Cell>
				</Row>
			{/if}
		{/each}
	</Body>
	<Pagination
		style="background-color: white; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"
		slot="paginate"
	>
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
  <Content id="simple-content">This Counseling Session will be deleted. Would you like to continue?</Content>
  <Actions>
    <Button>
      <Label>No</Label>
    </Button>
    <Button on:click={() => {
		removeAssessment(delClientId, delId);
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
