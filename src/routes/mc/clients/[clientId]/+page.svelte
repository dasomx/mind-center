<script lang="ts">
	import ClientForm from '$lib/components/client-form.svelte';
	import type { Client } from '$lib/types';
	import Card, { Content, Actions } from '@smui/card';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import {
		convertTimestampToDateString,
		convertTimestampToDateTimeString
	} from '$lib/firebase/utils';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { goto } from '$app/navigation';
	import { deleteClient } from '$lib/firebase/firebase.client';
	import { routes } from '$lib/config';

	/** @type {import('./$types').PageData}*/
	export let data;

	console.log('data ', data);
	const client: Client = data.props.client;
    async function removeClient(id: string) {
        console.log('removeClient', id);
        try {
            await deleteClient(id);
            console.log('Client deleted successfully');
            goto(routes.clients);
        } catch (error) {
            console.error('Error deleting client', error);
        }
    }
</script>

<h3>{data.props.client.name}'s profile</h3>

<div>
	<Card>
		<Content>
			<h4>General Information</h4>
			<LayoutGrid>
				<Cell>
					<TextField label="Father's Name" value={client.fatherName} input$readonly />
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
					<TextField label="Refer To" value={client.referTo} input$readonly />
				</Cell>
				<Cell>
					<TextField label="Result of Action" value={client.resultOfAction} input$readonly />
				</Cell>
				<Cell>
					<TextField label="Status" value={client.status} input$readonly />
				</Cell>
				<Cell>
					<TextField label="Sessions" value={client.sessions} input$readonly />
				</Cell>
				<Cell>
					<TextField label="Registration Date" value={client.regDate} input$readonly />
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
		</Content>
		<Actions>
			<Button variant="outlined" on:click={() => goto(`${routes.clients}/${client.id}/edit`)}>Edit</Button>
			<Button variant="outlined" on:click={async ()=> await removeClient(client.id)}>Delete</Button>
		</Actions>
	</Card>
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
