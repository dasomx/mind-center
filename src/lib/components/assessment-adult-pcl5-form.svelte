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

	/** @type {import('./$types').PageData} */
	export let counseling: Counseling;
	export let client: Client;

	let saving = false;
	counseling = counseling;

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
	

	// [TBD] It should be stored in a JSON file!
	// This JSON object is used when there was no assessment data saved
	// adult-form 
	const questionObj = `{
		"questions": [
			{
				"id": 0,
				"no": "",
				"text": "Adult (PCL-5)",
				"options": "",
				"type": "Meta",
				"answer":""
			},
			{
				"id": 1,
				"no": "",
				"text": "experience involving actual or threatened death, serious injury, or sexual violence. It could be something that happened to you directly, something you witnessed, or something you learned happened to a close family member or close friend. Some examples are a serious accident; fire; disaster such as a hurricane, tornado, or earthquake; physical or sexual attack or abuse; war; homicide; or suicide.\\n\\n First, please answer a few questions about your worst event, which for this questionnaire means the event that currently bothers you the most. This could be one of the examples above or some other very stressful experience. Also, it could be a single event (for example, a car crash) or multiple similar events (for example, multiple stressful events in a war-zone or repeated sexual abuse).",
				"options": "",
				"type": "Instruction",
				"answer":""
			},
			{
				"id": 2,
				"no": "Q",
				"text": "Briefly identify the worst event (if you feel comfortable doing so)",
				"options":"",
				"type": "Text",
				"answer":""
			},
			{
				"id": 3,
				"no": "Q",
				"text": "How long ago did it happen? (please estimate if you are not sure)",
				"options":"",
				"type": "Text",
				"answer":""
			},
			{
				"id": 4,
				"no": "Q",
				"text": "Did it involve actual or threatened death, serious injury, or sexual violence?",
				"options": ["Yes", "No"],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 5,
				"no": "Q",
				"text": "How did you experience it?",
				"options": ["It happened to me directly", "I witnessed it", "I learned about it happening to a close family member or close friend", "I was repeatedly exposed to details about it as part of my job (for example, paramedic, police, military, or other first responder)", "Other, please describe"],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 6,
				"no": "q",
				"text": "If 'Other', please describe",
				"options":"",
				"type": "Text",
				"answer":""
			},
			{
				"id": 7,
				"no": "Q",
				"text": "If the event involved the death of a close family member or close friend, was it due to some kind of accident or violence, or was it due to natural causes?",
				"options": ["Accident or violence", "Natural causes", "Not applicable (the event did not involve the death of a close family member or close friend)"],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 8,
				"no": "",
				"text": "Second, keeping this worst event in mind, read each of the problems on the next page and then circle one of the numbers to the right to indicate how much you have been bothered by that problem in the past month.",
				"options": "",
				"type": "Instruction",
				"answer":""
			},
			{
				"id": 9,
				"no": "1",
				"text": "Repeated, disturbing, and unwanted memories of the stressful experience?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 10,
				"no": "2",
				"text": "Repeated, disturbing dreams of the stressful experience?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 11,
				"no": "3",
				"text": "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 12,
				"no": "4",
				"text": "Feeling very upset when something reminded you of the stressful experience?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 13,
				"no": "5",
				"text": "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 14,
				"no": "6",
				"text": "Avoiding memories, thoughts, or feelings related to the stressful experience?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 15,
				"no": "7",
				"text": "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 16,
				"no": "8",
				"text": "Trouble remembering important parts of the stressful experience?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 17,
				"no": "9",
				"text": "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 18,
				"no": "10",
				"text": "Blaming yourself or someone else for the stressful experience or what happened after it?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 19,
				"no": "11",
				"text": "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 20,
				"no": "12",
				"text": "Loss of interest in activities that you used to enjoy?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 21,
				"no": "13",
				"text": "Feeling distant or cut off from other people?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 22,
				"no": "14",
				"text": "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 23,
				"no": "15",
				"text": "Irritable behavior, angry outbursts, or acting aggressively?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 24,
				"no": "16",
				"text": "Taking too many risks or doing things that could cause you harm?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 25,
				"no": "17",
				"text": "Being 'superalert' or watchful or on guard?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 26,
				"no": "18",
				"text": "Feeling jumpy or easily startled?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 27,
				"no": "19",
				"text": "Having difficulty concentrating?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			},
			{
				"id": 28,
				"no": "20",
				"text": "Trouble falling or staying asleep?",
				"options": [0, 1, 2, 3, 4],
				"type": "Rating",
				"answer":""
			}
		]
	}`


	onMount(() => {
		if(!counseling.assessment) { // assessment data alread saved
			const parseData = JSON.parse(questionObj);
			assessQuestions = parseData.questions; // array: eg, assessQuestions[3].answer
		} else { // first time assessment data 
			assessQuestions = JSON.parse(counseling.assessment);
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
									<span slot="label">{option}</span>
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
