<script lang="ts">
	import {
		type Counseling,
		type Client,
		EvaluationCategory,
	} from '$lib/types/index.d';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import HelperText from '@smui/textfield/helper-text';
	import { COUNSELING_TYPE } from '$lib/config';
	import { saveCounseling } from '$lib/firebase/firebase.client';
	import CircularProgress from '@smui/circular-progress';
	import { Timestamp } from 'firebase/firestore';
	import { convertTimestampToLocaleISOString } from '$lib/firebase/utils';
	import { onMount } from 'svelte';
	import { getAgeFromDOB } from '$lib/utils/common';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let counseling: Counseling;
	export let client: Client;

	let saving = false;
	counseling = counseling;
	let age = getAgeFromDOB(client.dob);
	let type = $page.url.searchParams.get('type'); // adult or child (to select the right form)
	let assessmentFile = (type == "ADULT" ? "Adult-PCL-5.json" : "Children-CRTES-R.json");
	// save counseling
	async function save() {
		if (!counseling || !client) return;
		try {
			counseling.assessment = JSON.stringify(assessQuestions);
			saving = true;
			await saveCounseling(counseling, client);
			// window.location = `/mc/clients/${client.id}?tab=Counselings`;
			window.location = `/mc/clients/${client.id}/counselings/${counseling.id}/edit`;
		} catch (error) {
			console.error('error on saving counseling', error);
		}
	}

	let assessQuestions:[] = [];
	
	onMount(async () => {
		if(!counseling.assessment) { // assessment data alread saved
			try {
				const response = await fetch('/forms/' + assessmentFile);
				if (!response.ok) {
					throw new Error('Failed to fetch JSON file');
				}

				assessQuestions = await response.json(); // array: eg, assessQuestions[3].answer
			} catch (error) {
				console.error('Error[0]:', error);
			}
		} else { // first time assessment data 
			assessQuestions = JSON.parse(counseling.assessment);
							
			// type mismatched: 
			// eg, type: ADULT but saved form is the one for CHILD
			if(assessQuestions[0].options != type) {
				try {
					assessmentFile = (type == "ADULT" ? "Adult-PCL-5.json" : "Children-CRTES-R.json");
					const response = await fetch('/forms/' + assessmentFile);
					
					if (!response.ok) {
						throw new Error('Failed to fetch JSON file');
					}
					assessQuestions = await response.json(); // array: eg, assessQuestions[3].answer
					console.log(assessQuestions);
				} catch (error) {
					console.error('Error[1]:', error);
				}
			}
		}
	});

</script>

<div class="container">
	{#if !counseling || !client}
		<CircularProgress />
	{:else}
		<div class="form-container">			
			<div class="grid-title">Client Info</div>
			<LayoutGrid class="grid-container">
				<Cell>
					<Textfield
						label="Client Name"
						bind:value={client.name}
						variant="outlined"
						input$readonly
					/>
				</Cell>
				<Cell>
					<Textfield
						label="Disaster Victim Type"
						bind:value={client.disasterVictimType}
						variant="outlined"
						input$readonly
					/>
				</Cell>
				<Cell>
					<Textfield
						label="Disaster Type"
						variant="outlined"
						bind:value={client.disasterType}
						input$readonly
					/>
				</Cell>
				<Cell>
					<Textfield label="Age" variant="outlined" bind:value={ age } input$style="color: red;" input$readonly />
				</Cell>
				<Cell>
					<Textfield label="Mobile" variant="outlined" bind:value={client.mobile} input$readonly />
				</Cell>
				<Cell>
					<Textfield
						label="Home Phone"
						variant="outlined"
						bind:value={client.contactNoHome}
						input$readonly
					/>
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

			<div class="grid-title">Assessment</div>
			<LayoutGrid class="grid-container">
				{#each assessQuestions as question}
				<Cell span={12}>
					<div class="question">
						{#if question.type == 'Meta'}
							<div>{question.text}</div>
						{:else if question.type == 'Instruction'}
							<div style='font-weight:bold;'>Instructions: </div>
							<div>{question.text}</div>
						{:else if question.type == 'Text'}
							<p>{question.no}. {question.text}</p>
							<div>
								<Textfield
								label=""
								variant="outlined"
								bind:value={assessQuestions[question.id].answer}
								style="width: 100%"
							/>
							</div>
						{:else if question.type == 'Rating'}
							<p>{question.no}. {question.text}</p>
							<div>
								{#each question.options as option}
								<FormField>
									<Radio bind:group={assessQuestions[question.id].answer} value={option} touch />
									<span slot="label" style="margin-right:4px;">{option}</span>
								</FormField>									
								{/each}
							</div>
						{/if}
					</div>
				</Cell>
			  {/each}
			</LayoutGrid>

			<div style="align-self: flex-end;">
				<Button variant="outlined" on:click={() => history.back()}>Close</Button>
				<Button variant="raised" disabled={saving} on:click={save}>
					{saving ? 'Saving...' : 'Save'}
					{#if saving}
						<CircularProgress style="height: 24px; width: 24px;" indeterminate />
					{/if}
				</Button>
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

	.question {
		margin-bottom: 1em;
	}

</style>
