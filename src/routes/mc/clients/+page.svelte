<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { DISASTER_NAMES } from '$lib/config';
	import ClientList from '$lib/components/client-list.svelte';
	import {
		ClientStatus,
		DisasterType,
		DisasterVictimType,
		GenderType,
		Jobs,
		ReferType,
		ResultOfAction,
		type Client
	} from '$lib/types/index.d.ts';
	import Snackbar, { Label, Actions } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { goto } from '$app/navigation';


	/** @type {import('./$types').PageData} */
	export let data;
	console.log('data', data);
	const { clients } = data;

	let name: string = '';
	let disasterName: string = '';
	let mobile: string = '';
	let snackbarInfo: Snackbar;
	let information: string = '';

	function initValues() {
		name = '';
		disasterName = '';
		mobile = '';
	}

	function showSnackbarInfo(info: string) {
		information = info;
		snackbarInfo.open();
	}

	// const clients: Client[] = [
	// 	{
	// 		id: '1',
	// 		disasterName: '816',
	// 		disasterType: DisasterType.HouseBurnt,
	// 		fatherName: 'Muhammad Raza',
	// 		name: 'Ahmed Raza',
	// 		gender: GenderType.Male,
	// 		dob: '1987-03-12',
	// 		cnicNumber: '35202-1234567-1',
	// 		code: 'LHR-001',
	// 		contactNoHome: '042-1234567',
	// 		mobile: '0300-1234567',
	// 		address: '123 Main Street, Lahore',
	// 		job: Jobs.JobWork,
	// 		schoolName: 'Govt. High School Lahore',
	// 		grade: 'B',
	// 		companyName: 'Lahore Construction Ltd.',
	// 		otherJobs: 'Part-time Tutor',
	// 		disasterVictimType: DisasterVictimType.Father,
	// 		referTo: ReferType.CareerCounselor,
	// 		resultOfAction: ResultOfAction.CaseManagementRegistration,
	// 		status: ClientStatus.Init,
	// 		sessions: 10,
	// 		regDate: '2024-08-01',
	// 		createdAt: 1691740800000,
	// 		updatedAt: 1691740800000
	// 	},
	// 	{
	// 		id: '2',
	// 		disasterName: '922',
	// 		disasterType: DisasterType.Looted,
	// 		fatherName: 'Abdul Haq',
	// 		name: 'Fatima Haq',
	// 		gender: GenderType.Female,
	// 		dob: '1990-07-25',
	// 		cnicNumber: '35202-7654321-0',
	// 		code: 'LHR-002',
	// 		contactNoHome: '042-7654321',
	// 		mobile: '0301-2345678',
	// 		address: '456 Market Road, Lahore',
	// 		job: Jobs.Student,
	// 		schoolName: 'Lahore College for Women',
	// 		grade: 'A',
	// 		companyName: '',
	// 		otherJobs: 'Freelance Writer',
	// 		disasterVictimType: DisasterVictimType.Daughter,
	// 		referTo: ReferType.Psychiatrist,
	// 		resultOfAction: ResultOfAction.CounselingFollowUp,
	// 		status: ClientStatus.Completed,
	// 		sessions: 5,
	// 		regDate: '2024-07-20',
	// 		createdAt: 1690502400000,
	// 		updatedAt: 1690502400000
	// 	},
	// 	{
	// 		id: '3',
	// 		disasterName: '816',
	// 		disasterType: DisasterType.Killed,
	// 		fatherName: 'Sami Ullah',
	// 		name: 'Bilal Sami',
	// 		gender: GenderType.Male,
	// 		dob: '1985-11-10',
	// 		cnicNumber: '35202-9876543-2',
	// 		code: 'LHR-003',
	// 		contactNoHome: '042-9876543',
	// 		mobile: '0302-3456789',
	// 		address: '789 Garden Town, Lahore',
	// 		job: Jobs.JobWork,
	// 		schoolName: 'Aitchison College',
	// 		grade: 'A+',
	// 		companyName: 'Lahore General Hospital',
	// 		otherJobs: 'Medical Consultant',
	// 		disasterVictimType: DisasterVictimType.Relative,
	// 		referTo: ReferType.VocationalTrainer,
	// 		resultOfAction: ResultOfAction.ServiceTermination,
	// 		status: ClientStatus.InProgress,
	// 		sessions: 15,
	// 		regDate: '2024-07-15',
	// 		createdAt: 1689811200000,
	// 		updatedAt: 1689811200000
	// 	},
	// 	{
	// 		id: '4',
	// 		disasterName: '922',
	// 		disasterType: DisasterType.ChurchBurnt,
	// 		fatherName: 'Ali Akbar',
	// 		name: 'Zainab Akbar',
	// 		gender: GenderType.Female,
	// 		dob: '1995-06-20',
	// 		cnicNumber: '35202-1122334-5',
	// 		code: 'LHR-004',
	// 		contactNoHome: '042-3344556',
	// 		mobile: '0303-4567890',
	// 		address: '101 Gulberg, Lahore',
	// 		job: Jobs.Student,
	// 		schoolName: 'Punjab University',
	// 		grade: 'A',
	// 		companyName: '',
	// 		otherJobs: 'Volunteer',
	// 		disasterVictimType: DisasterVictimType.Sister,
	// 		referTo: ReferType.Others,
	// 		resultOfAction: ResultOfAction.CounselingFollowUp,
	// 		status: ClientStatus.Pending,
	// 		sessions: 3,
	// 		regDate: '2024-07-30',
	// 		createdAt: 1690684800000,
	// 		updatedAt: 1690684800000
	// 	},
	// 	{
	// 		id: '5',
	// 		disasterName: '816',
	// 		disasterType: DisasterType.Injured,
	// 		fatherName: 'Rehman Malik',
	// 		name: 'Usman Malik',
	// 		gender: GenderType.Male,
	// 		dob: '1992-02-28',
	// 		cnicNumber: '35202-5566778-9',
	// 		code: 'LHR-005',
	// 		contactNoHome: '042-5566778',
	// 		mobile: '0304-5678901',
	// 		address: '202 DHA, Lahore',
	// 		job: Jobs.JobWork,
	// 		schoolName: 'Beaconhouse School',
	// 		grade: 'B+',
	// 		companyName: 'Malik Traders',
	// 		otherJobs: '',
	// 		disasterVictimType: DisasterVictimType.Son,
	// 		referTo: ReferType.Lawyer,
	// 		resultOfAction: ResultOfAction.CaseManagementRegistration,
	// 		status: ClientStatus.InProgress,
	// 		sessions: 8,
	// 		regDate: '2024-08-05',
	// 		createdAt: 1691193600000,
	// 		updatedAt: 1691193600000
	// 	}
	// ];
	

</script>

<div>
	<h6>My Clients</h6>
	<h5>My Clients</h5>
	<div class="container">
		<div class="inner-container">
			<Textfield variant="outlined" label="Name" bind:value={name} type="text" style="flex: 1" />
			<Select variant="outlined" label="Disaster Name" bind:value={disasterName} style="flex: 1">
				{#each DISASTER_NAMES as type (type)}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
			<Textfield
				variant="outlined"
				label="Mobile"
				bind:value={mobile}
				type="phone"
				style="flex: 1"
			/>
		</div>
		<div style="align-self: flex-end;">
			<Button on:click={initValues}>Clear</Button>
			<Button variant="raised" on:click={() => showSnackbarInfo('미구현')}>Search</Button>
		</div>
	</div>
	<div class="list-container">
		<div class="list-header">
			<div>
				<span>Total</span>
				<span style="margin-left: 17px"><strong>{clients.length}</strong></span>
			</div>
			<Button variant="raised" on:click={() => goto('/mc/clients/new')}>Add Client</Button>
		</div>
		<ClientList data={clients.map((client, index) => ({ no: index + 1, ...client }))} />
	</div>
</div>
<Snackbar bind:this={snackbarInfo}>
	<Label>{information}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>

<style>
	.search-container {
		align-self: stretch;
		flex-grow: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		gap: 12px;
		padding: 24px;
		border-radius: 4px;
		border: solid 1px #e0e0e0;
		background-color: #fff;
	}
	.inner-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0;
		background-color: white;
		gap: 24px;
		width: 100%;
	}

	.list-container {
		margin-top: 24px;
		background-color: white;
		border-radius: 8px;
	}
	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 24px;
		border-bottom: solid 1px #e0e0e0;
	}
</style>
