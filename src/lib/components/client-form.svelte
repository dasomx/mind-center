<script lang="ts">
	import { GenderType, type Client } from '$lib/types/index.d.ts';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import {
		GENDERS,
		JOBS,
		DISASTER_NAMES,
		DISASTER_TYPES,
		DISASTER_VICTIM_TYPES,
		REFER_TO
	} from '$lib/config';

	export let data: Client = {
		id: '3',
		disasterName: '816',
		disasterType: 'Killed',
		fatherName: 'Sami Ullah',
		name: 'Bilal Sami',
		gender: 'Male',
		dob: '1985-11-10',
		cnicNumber: '35202-9876543-2',
		code: 'LHR-003',
		contactNoHome: '042-9876543',
		mobile: '0302-3456789',
		address: '789 Garden Town, Lahore',
		job: 'Job / Work',
		schoolName: 'Aitchison College',
		grade: 'A+',
		companyName: 'Lahore General Hospital',
		otherJobs: 'Medical Consultant',
		disasterVictimType: 'Relative',
		referTo: 'Vocational Trainer',
		resultOfAction: 'Service termination',
		caseManager: 'Ali',
		medicalCoverage: 'Yes',
		status: 'In Progress',
		sessions: 15,
		regDate: '2024-07-15',
		createdAt: 1689811200000,
		updatedAt: 1689811200000
	};
</script>

<div class="container">
	<div class="form-container">
		<div class="grid-title">General Information</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Textfield label="Name" variant="outlined" bind:value={data.name} />
			</Cell>
			<Cell>
				<div style="font-size:small;color: #525252">Gender</div>
				<div style="display: flex; flex-direction: row; gap:16px">
					{#each GENDERS as option}
						<FormField>
							<Radio bind:group={data.gender} value={option} />
							<span slot="label">{option}</span>
						</FormField>
					{/each}
				</div>
			</Cell>
			<Cell>
				<Textfield label="DOB" variant="outlined" bind:value={data.dob} type="date" />
			</Cell>
			<Cell>
				<Textfield label="CNIC Number" variant="outlined" bind:value={data.cnicNumber} />
			</Cell>
			<Cell>
				<Textfield label="Mobile" variant="outlined" bind:value={data.mobile} />
			</Cell>
			<Cell>
				<Textfield label="Father Name" variant="outlined" bind:value={data.fatherName} />
			</Cell>
			<Cell>
				<Textfield label="Code(system)" variant="outlined" bind:value={data.code} />
			</Cell>
			<Cell>
				<Textfield label="Contact No. Home" variant="outlined" bind:value={data.contactNoHome} />
			</Cell>
			<Cell>
				<Textfield label="Mobile" variant="outlined" bind:value={data.mobile} />
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Address"
					variant="outlined"
					bind:value={data.address}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<div>Job</div>
				<div style="display: flex; flex-direction: column;">
					<FormField>
						<Radio bind:group={data.job} value="None" touch />
						<span slot="label">None</span>
					</FormField>
					<FormField>
						<Radio bind:group={data.job} value="Student" touch />
						<span slot="label">Student</span>
					</FormField>
					{#if data.job === 'Student'}
						<div style="display: flex; flex-direction: row; gap: 24px">
							<Textfield label="School Name" variant="outlined" bind:value={data.schoolName} />
							<Textfield label="Grade" variant="outlined" bind:value={data.grade} />
						</div>
					{/if}
					<FormField>
						<Radio bind:group={data.job} value="Job / Work" touch />
						<span slot="label">Job / Work</span>
					</FormField>
					{#if data.job === 'Job / Work'}
						<Textfield label="Company Name" variant="outlined" bind:value={data.companyName} />
					{/if}
					<FormField>
						<Radio bind:group={data.job} value="Others" touch />
						<span slot="label">Others</span>
					</FormField>
					{#if data.job === 'Others'}
						<Textfield label="Other Jobs" variant="outlined" bind:value={data.otherJobs} />
					{/if}
				</div>
			</Cell>
		</LayoutGrid>
		<div class="grid-title">Disaster Information</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Select variant="outlined" label="Disaster Name" bind:value={data.disasterName}>
					{#each DISASTER_NAMES as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select variant="outlined" label="Disaster Type" bind:value={data.disasterType}>
					{#each DISASTER_TYPES as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Textfield label="Father's Name" variant="outlined" bind:value={data.fatherName} />
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Disaster Victim Type"
					bind:value={data.disasterVictimType}
				>
					{#each DISASTER_VICTIM_TYPES as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select variant="outlined" label="Refer To" bind:value={data.referTo}>
					{#each REFER_TO as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
		</LayoutGrid>
		<LayoutGrid class="grid-container">
			<Cell span={4}>
				<Textfield label="Case manager" variant="outlined" bind:value={data.caseManager} />
			</Cell>
			<Cell span={8}>
				<Textfield
					label="Medical Coverage"
					variant="outlined"
					bind:value={data.medicalCoverage}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<Select
					variant="outlined"
					label="Result of Action"
					bind:value={data.resultOfAction}
					style="width: 100%"
				>
					<Option value="Service termination">Service termination</Option>
					<Option value="Case Management Registration">Case Management Registration</Option>
					<Option value="Case Management Closure">Case Management Closure</Option>
					<Option value="Case Management Transfer">Case Management Transfer</Option>
					<Option value="Case Management Re-Open">Case Management Re-Open</Option>
				</Select>
			</Cell>
		</LayoutGrid>
		<div style="align-self: flex-end;">
			<Button variant="outlined" on:click={()=>history.back()}>Close</Button>
			<Button variant="raised" on:click={()=>alert('under construction :)')}>Save</Button>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.form-container {
		display: flex;
		flex: 1;
		height: 100vh;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		border-radius: 4px;
	}

	:global(.grid-container) {
		width: 100%;
		border-radius: 8px;
		border: solid 1px #e0e0e0;
		background-color: #fff;
	}
	:global(.mdc-text-field) {
		width: 100%;
	}
	:global(.mdc-select) {
		width: 100%;
	}
	.grid-title {
        font-size: 1.5rem;
		height: 32px;
		align-self: stretch;
		flex-grow: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0;
        margin-top: 2.5rem;
	}
</style>
