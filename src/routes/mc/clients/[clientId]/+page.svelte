<script lang="ts">
	import type { Client } from '$lib/types';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import {
		convertTimestampToDateTimeString
	} from '$lib/firebase/utils';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Paper, { Content } from '@smui/paper';
	import { goto } from '$app/navigation';
	import { deleteClient } from '$lib/firebase/firebase.client';
	import { routes } from '$lib/config';
	import StatusChip from '$lib/components/status-chip.svelte';
	import CounselingList from '$lib/components/counseling-list.svelte';
	import AssessmentList from '$lib/components/assessment-list.svelte';
	import { page } from '$app/stores';
	import LinkList from '$lib/components/link-list.svelte';
	import EndingSessionList from '$lib/components/ending-session-list.svelte';


	/** @type {import('./$types').PageData}*/
	export let data;

	let queryParamTab: string | null = null;
	page.subscribe(($page) => {
		// Query parameter 'example'의 값을 가져옵니다.
		queryParamTab = $page.url.searchParams.get('tab');
	});

	console.debug('queryParamTab ', queryParamTab);
	// console.debug('counselings ', data.props.counselings);

	// If some keys of client were undefined, make them as null
	const client: Client = {
		...data.props.client,
		fatherName: data.props.client?.fatherName ?? null,
		name: data.props.client?.name ?? null,
		gender: data.props.gender ?? null,
		dob: data.props.client?.dob ?? null,
		cnicNumber: data.props.client?.cnicNumber ?? null,
		code: data.props.client?.code ?? null,
		contactNoHome: data.props.client?.contactNoHome ?? null,
		mobile: data.props.client?.mobile ?? null,
		address: data.props.client?.address ?? null,
		job: data.props.client?.job ?? null,
		schoolName: data.props.client?.schoolName ?? null,
		grade: data.props.client?.grade ?? null,
		companyName: data.props.client?.companyName ?? null,
		otherJobs: data.props.client?.otherJobs ?? null,
		disasterName: data.props.client?.disasterName ?? null,
		disasterType: data.props.client?.disasterType ?? null,
		disasterVictimType: data.props.client?.disasterVictimType ?? null,
		referTo: data.props.client?.referTo ?? null,
		resultOfAction: data.props.client?.resultOfAction ?? null,
		status: data.props.client?.status ?? null,
		sessions: data.props.client?.sessions ?? null,
		caseManager: data.props.client?.caseManager ?? null,
		medicalCoverage: data.props.client?.medicalCoverage ?? null,
		createdAt: data.props.client?.createdAt ?? null,
		updatedAt: data.props.client?.updatedAt ?? null
	};

	async function removeClient(id: string) {
		console.debug('removeClient', id);
		try {
			await deleteClient(id);
			console.debug('Client deleted successfully');
			goto(routes.clients);
		} catch (error) {
			console.error('Error deleting client', error);
		}
	}

	let active = queryParamTab ?? 'General';
</script>

<h3>{data.props.client.name}'s profile</h3>

<div>
	<TabBar tabs={['General', 'Assessments', 'Counselings', 'Links', 'Ending', 'Memo']} let:tab bind:active>
		<Tab {tab}>
			<Label>{tab}</Label>
		</Tab>
	</TabBar>
	{#if active === 'General'}
		<Paper variant="unelevated">
			<Content>
				<Paper variant="outlined" style="margin-bottom: 1em">
				<section>Genenral</section>
				<LayoutGrid>
					<Cell>
						<StatusChip status={client.status} />
					</Cell>
					<Cell>
						<TextField label="Name" value={client.name} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Gender" value={client.gender} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Date of Birth" value={client.dob} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Father's Name" value={client.fatherName} input$readonly />
					</Cell>
					<Cell>
						<TextField label="CNIC Number" value={client.cnicNumber} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Code" value={client.code} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Contact No (Home)" value={client.contactNoHome} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Mobile" value={client.mobile} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Address" value={client.address} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Job" value={client.job} input$readonly />
					</Cell>
					<Cell>
						<TextField label="School Name" value={client.schoolName} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Grade" value={client.grade} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Company Name" value={client.companyName} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Other Jobs" value={client.otherJobs} input$readonly />
					</Cell>
				</LayoutGrid>
				</Paper>
				<Paper variant="outlined"  style="margin-bottom: 1em">
				<section>Disaster</section>
				<LayoutGrid>
					<Cell>
						<TextField label="Disaster Name" value={client.disasterName} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Disaster Type" value={client.disasterType} input$readonly />
					</Cell>
					<Cell>
						<TextField
							label="Disaster Victim Type"
							value={client.disasterVictimType}
							input$readonly
						/>
					</Cell>
					<Cell>
						<TextField label="Case Manager" value={client.caseManager} input$readonly />
					</Cell>
					<Cell>
						<TextField label="Medical Coverage" value={client.medicalCoverage} input$readonly />
					</Cell>
					<Cell>
						<TextField
							label="Created At"
							value={convertTimestampToDateTimeString(client.createdAt)}
							input$readonly
						/>
					</Cell>
					<Cell>
						<TextField
							label="Updated At"
							value={convertTimestampToDateTimeString(client.updatedAt)}
							input$readonly
						/>
					</Cell>
				</LayoutGrid>
				</Paper>
				<div>
					<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/edit`)}
						>Edit</Button
					>
					<Button variant="outlined" on:click={async () => await removeClient(client.id)}
						>Delete</Button
					>
				</div>
			</Content>
		</Paper>
		{:else if active === 'Assessments'}
		<Paper variant="unelevated">
			<Content>
				<section>Assessments</section>
				<div style="display: flex; justify-content: flex-end;">
					<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/assessments/new`)}
						>Add new assessment</Button
					>
				</div>
				<AssessmentList data={data.props.assessments} />
			</Content>
		</Paper>
		{:else if active === 'Counselings'}
		<Paper variant="unelevated">
			<Content>
				<section>Counselings</section>
				<div style="display: flex; justify-content: flex-end;">
					<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/counselings/new`)}
						>Add new session</Button
					>
				</div>
				<CounselingList data={data.props.counselings} />
			</Content>
		</Paper>
	{:else if active === 'Links'}
		<Paper variant="unelevated">
			<Content>
				<section>Links</section>
				<div style="display: flex; justify-content: flex-end;">
					<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/links/new`)}
						>Add new referrer</Button
					>
				</div>
				<LinkList data={data.props.links} />
			</Content>
		</Paper>
	{:else if active === 'Ending'}
		<Paper variant="unelevated">
			<Content>
				<section>Ending</section>
				<div style="display: flex; justify-content: flex-end;">
					<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/endings/new`)}
						>Add new ending</Button
					>
				</div>
				<EndingSessionList data={data.props.endings} />
			</Content>
		</Paper>
	{:else if active === 'Memos'}
		<Paper variant="unelevated">
			<Content>
				<section>Memos</section>
			</Content>
		</Paper>
	{/if}
</div>

<style>
	h3 {
		margin-bottom: 16px;
	}

	Card {
		margin: 16px 0;
	}

	TextField {
		margin-bottom: 16px;
	}
</style>
