<script lang="ts">
	import { type Counseling, type Client, CounselingType, RelationVictim } from '$lib/types/index.d.ts';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
  	import HelperText from '@smui/textfield/helper-text'
	import {
		DISASTER_NAMES,
		DISASTER_TYPES,
		DISASTER_VICTIM_TYPES,
		REFER_TO,
		COUNSELING_TYPE,
		INIT_COUNSELING
	} from '$lib/config';

	let data: Counseling = INIT_COUNSELING;
	console.log('data ', data);
	let selectedSession = 'normal';
	let clientData: Client = {
		id:'',
		name: '',
		mobile:'',
		address:'',
		contactNoHome:''

	};

	let clients: any = [
		{id: '1', name: 'Ahmed Raza'},
		{id: '2', name: 'Fatima Haq'},
		{id: '3', name: 'Bilal Sami'},
		{id: '4', name: 'Zainab Akbar'}
	];

	let relationVictimeEntries = Object.entries(RelationVictim);
	
</script>

<div class="container">
	<div class="form-container">
		<div class="inner-container addSessionType">
			<span>
				Add Session Type *
			</span>
			<span>
				<FormField>
					<Radio bind:group={selectedSession} value="normal" touch />
					<span slot="label">Normal Session</span>
				</FormField>

				<FormField>
					<Radio bind:group={selectedSession} value="ending" touch />
					<span slot="label">Ending Session</span>
				</FormField>
			</span>
		</div>

		<div class="grid-title">Normal Session</div>
		<LayoutGrid class="grid-container">		
			<Cell>
				<Textfield
					bind:value={data.startTime}
					label="Start Time"
					type="datetime-local"
					variant="outlined"
    			/>
			</Cell>
			<Cell>
				<Textfield
					bind:value={data.endTime}
					label="End Time"
					type="datetime-local"
					variant="outlined"
    			/>
			</Cell>
			<Cell>
				<Textfield label="Counselor" variant="outlined" bind:value={data.counselorId} />
			</Cell>
			<Cell>
				<Select variant="outlined" label="Counseling Type" bind:value={data.counselingType}>
					{#each COUNSELING_TYPE as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell span={12}>
				<div class="grid-title">Information Provider</div>
				<div>Information ProviderRelationship with the Victim*</div>
				
				<div style="display: flex; flex-direction: column;">
					{#each relationVictimeEntries as [key, value]}
						<FormField>
							<Radio bind:group={data.relationVictim} value={key} touch />
							<span slot="label">{value}
							{#if key === 'Family'}
								<Select variant="outlined" label="Choose if Family" bind:value={data.relationFamilyDetail}>
									{#each DISASTER_VICTIM_TYPES as option}
										<Option value={option}>{option}</Option>
									{/each}
								</Select>								
							{/if}
							</span>
						</FormField>
				  	{/each}
				</div>
			</Cell>
			<Cell>
				<Select variant="outlined" label="Client Name" bind:value={clientData.id}>
					{#each clients as option}
						<Option value={option.id}>{option.name}</Option>
					{/each}
				</Select>	
			</Cell>
			<Cell>
				<Textfield label="Mobile" variant="outlined" bind:value={clientData.mobile} />
			</Cell>
			<Cell>
				<Textfield label="Home Phone" variant="outlined" bind:value={clientData.contactNoHome} />
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Address"
					variant="outlined"
					bind:value={clientData.address}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<Select variant="outlined" label="Disaster Type" bind:value={data.disasterType}>
					{#each DISASTER_TYPES as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Emergency Intervention"
					variant="outlined"
					bind:value={data.emergencyIntervention}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Counseling Topic"
					variant="outlined"
					bind:value={data.counselingTopic}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<div class="margins">
					<Textfield
					  style="width: 100%;"
					  helperLine$style="width: 100%;"
					  textarea
					  bind:value={data.counselingDetails}
					  label="Counseling Detail"
					>
					  <HelperText slot="helper">Write the Counseling Details</HelperText>
					</Textfield>
				  </div>
				   
			</Cell>
		</LayoutGrid>
		
		<div class="grid-title">Categorical Evaluations</div>
		<LayoutGrid class="grid-container">
		</LayoutGrid>

		<div class="grid-title">Assessment</div>
		<LayoutGrid class="grid-container">
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

	.addSessionType {
		flex-grow: 1;
		font-family: Roboto;
		font-size: 20px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: 0.15px;
		text-align: left;
		color: rgba(0, 0, 0, 0.87);
		border: solid 1px #2196f3;
		background-color: #fff;
		border-radius: 8px;
		padding: 24px;
	}
</style>