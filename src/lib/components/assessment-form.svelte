<script lang="ts">
	import {
		type Client,
		type Assessment,
	} from '$lib/types/index.d';
	import FormField from '@smui/form-field';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import { saveAssessment} from '$lib/firebase/firebase.client';
	import CircularProgress from '@smui/circular-progress';
	import { onMount } from 'svelte';
	import { getAgeFromDOB } from '$lib/utils/common';
	import { page } from '$app/stores';

	import AdultPCL5 from "./tools/Adult-PCL-5.json";
	import ChildrenCRTESR from "./tools/Children-CRTES-R.json";
	import TextWithNewline from './text-with-newline.svelte';

	/** @type {import('./$types').PageData} */
	export let client: Client;
	export let assessment: Assessment | null;

	let saving = false;
	let age = getAgeFromDOB(client.dob);
	let assessQuestions = age > 18 ? AdultPCL5 : ChildrenCRTESR;

	// save assessment data
	async function save() {
		if (!client) return;
		if (!assessment) {
			assessment = {
				respond: assessQuestions,
			};
		}
		try {
			saving = true;
			await saveAssessment(assessment, client);
			window.location = `/mc/clients/${client.id}?tab=Assessments`;
		} catch (error) {
			console.error('error on saving assessment', error);
		}
	}

	
	onMount(async () => {
		if(assessment) { // assessment data alread saved
			assessQuestions = assessment.respond;							
		}
	});

</script>

<div class="container">
	{#if !client}
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
							<TextWithNewline text={question.text} />
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
