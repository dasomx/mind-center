<script lang="ts">
	import {
		type Counseling,
		type Client,
		EvaluationCategory,

		DisasterVictimType

	} from '$lib/types/index.d.ts';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import HelperText from '@smui/textfield/helper-text';
	import {
		DISASTER_TYPES,
		DISASTER_VICTIM_TYPES,
		COUNSELING_TYPE,
	} from '$lib/config';
	import { saveCounseling } from '$lib/firebase/firebase.client';
	import CircularProgress from '@smui/circular-progress';

	/** @type {import('./$types').PageData} */
	export let counseling: Counseling;
	export let client: Client

	counseling = {
		...counseling,
		categoricalEvaluation: {
			psychological: 0,
			physical: 0,
			educational: 0,
			financial: 0,
			spiritual: 0
		},
	}

	let startTime = counseling?.startTime?.toISOString().slice(0, 16);
	let endTime = counseling?.endTime?.toISOString().slice(0, 16);

	let selectedSession = 'normal';

	let relationVictimeEntries = Object.entries(DisasterVictimType);
	let evaluationCategory = Object.entries(EvaluationCategory);

	// save counseling
	async function save() {
		console.log('counseling', counseling);
		if(!counseling || !client) return;
		try {
			await saveCounseling(counseling, client);
		} catch (error) {
			console.log('error on saving counseling', error);
		}
	}

	// cancel and go back
	function cancel() {
		history.back();
	}
</script>

<div class="container">
	{#if !counseling || !client}
	<CircularProgress />
	{:else}
	<div class="form-container">
		<div class="inner-container addSessionType">
			<span> Add Session Type * </span>
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

		<div class="grid-title">Client Info</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Textfield label="Client Name" bind:value={client.name} variant="outlined" input$readonly />
			</Cell>
			<Cell>
				<Textfield label="Disaster Victim Type" bind:value={client.disasterVictimType} variant="outlined" input$readonly />
			</Cell>
			<Cell>
				<Textfield label="Disaster Type" variant="outlined" bind:value={client.disasterType} input$readonly />
			</Cell>
			<Cell>
				<Textfield label="Mobile" variant="outlined" bind:value={client.mobile} input$readonly/>
			</Cell>
			<Cell>
				<Textfield label="Home Phone" variant="outlined" bind:value={client.contactNoHome} input$readonly/>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Address"
					variant="outlined"
					bind:value={client.address}
					style="width: 100%"
					input$readonly
				/>
			</Cell>
		</LayoutGrid>
		<div class="grid-title">Normal Session</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Textfield
					bind:value={startTime}
					label="Start Time"
					type="datetime-local"
					variant="outlined"
				/>
			</Cell>
			<Cell>
				<Textfield
					bind:value={endTime}
					label="End Time"
					type="datetime-local"
					variant="outlined"
				/>
			</Cell>
			<Cell>
				<Textfield label="Counselor" variant="outlined" bind:value={counseling.counselorId} />
			</Cell>
			<Cell>
				<Select variant="outlined" label="Counseling Type" bind:value={counseling.counselingType}>
					{#each COUNSELING_TYPE as option}
						<Option value={option}>{option}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Emergency Intervention"
					variant="outlined"
					bind:value={counseling.emergencyIntervention}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<Textfield
					label="Counseling Topic"
					variant="outlined"
					bind:value={counseling.counselingTopic}
					style="width: 100%"
				/>
			</Cell>
			<Cell span={12}>
				<div class="margins">
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						textarea
						bind:value={counseling.counselingDetails}
						label="Counseling Detail"
					>
						<HelperText slot="helper">Write the Counseling Details</HelperText>
					</Textfield>
				</div>
			</Cell>
			<Cell span={12}>
				<div class="margins">
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						textarea
						bind:value={counseling.pictureUrls}
						label="Click to upload or drag & drop"
					>
						<HelperText slot="helper">Click to upload or drag & drop</HelperText>
					</Textfield>
				</div>
			</Cell>
			<Cell span={12}>
				<div class="margins">
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						textarea
						bind:value={counseling.psychologicalAidDetails}
						label="Psychological Aid Details"
					>
						<HelperText slot="helper">Write the Psychological Aid Details</HelperText>
					</Textfield>
				</div>
			</Cell>
			<Cell span={12}>
				<div class="grid-title">Categorical Evaluations</div>
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Psycological"
					bind:value={counseling.categoricalEvaluation.psychological}
				>
					{#each evaluationCategory as [key, value]}
						<Option value={key}>{value}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Physical"
					bind:value={counseling.categoricalEvaluation.physical}
				>
					{#each evaluationCategory as [key, value]}
						<Option value={key}>{value}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Educational"
					bind:value={counseling.categoricalEvaluation.educational}
				>
					{#each evaluationCategory as [key, value]}
						<Option value={key}>{value}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Financial"
					bind:value={counseling.categoricalEvaluation.financial}
				>
					{#each evaluationCategory as [key, value]}
						<Option value={key}>{value}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell>
				<Select
					variant="outlined"
					label="Spiritual"
					bind:value={counseling.categoricalEvaluation.spiritual}
				>
					{#each evaluationCategory as [key, value]}
						<Option value={key}>{value}</Option>
					{/each}
				</Select>
			</Cell>
			<Cell span={12}>
				<div class="grid-title">Evaluation Total: _____ Average:_____</div>
			</Cell>
		</LayoutGrid>

		<div class="grid-title">Assessment</div>
		<LayoutGrid class="grid-container"></LayoutGrid>

		<div style="align-self: flex-end;">
			<Button variant="outlined" on:click={() => history.back()}>Close</Button>
			<Button variant="raised" on:click={save}>Save</Button>
		</div>
	</div>
	{/if}
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
