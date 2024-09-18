<script lang="ts">
	import { type Counseling, type Client, EvaluationCategory } from '$lib/types/index.d';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import HelperText from '@smui/textfield/helper-text';
	import { COUNSELING_TYPE, routes, COUNSELING_STATUS_TYPES } from '$lib/config';
	import { saveCounseling } from '$lib/firebase/firebase.client';
	import CircularProgress from '@smui/circular-progress';
	import { Timestamp } from 'firebase/firestore';
	import { convertTimestampToLocaleISOString } from '$lib/firebase/utils';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isUndefined, round } from '$lib/utils/common';
	import ClientGeneralInfoForm from './client-general-info-form.svelte';
	import FileUploader from './file-uploader.svelte';
	import ImageList, {
		Item,
		ImageAspectContainer,
		Image,
		Supporting,
		Label
	} from '@smui/image-list';
	import { ImageViewer } from 'svelte-image-viewer';
	import IconButton from '@smui/icon-button';

	/** @type {import('./$types').PageData} */
	export let counseling: Counseling;
	export let client: Client;

	let saving = false;
	counseling = counseling;

	let catEvalTotal = 0; // Total evaluation
	let catEvalAvg = 0; // Average evaluation

	if(!counseling.attachments) {
		counseling.attachments = [];
	}

	function calculateEval() {
		catEvalTotal = 0; // reset
		catEvalAvg = 0; // reset
		let cnt = 0;

		Object.values(counseling.categoricalEvaluation).forEach((value) => {
			if (!isUndefined(value)) {
				catEvalTotal += parseInt(value);
				cnt++;
			}
		});

		catEvalAvg = cnt > 0 ? round(catEvalTotal / cnt, 1) : 0;
	}

	// Run to get evaluation result
	onMount(() => {
		calculateEval();
	});

	const handleUploadSuccess = (event: any) => {
		const { url, docId, filename } = event.detail;
		console.log('File uploaded successfully:', url, docId);
		counseling.attachments = [...counseling.attachments, { url, docId, filename, status: 'a' }];
		// Additional actions (e.g., update UI, notify user)
	};

	const handleUploadError = (event: any) => {
		const { error } = event.detail;
		console.error('Upload error:', error);
		// Handle the error as needed
	};

	let startTime = convertTimestampToLocaleISOString(counseling?.startTime ?? Timestamp.now());
	let endTime = convertTimestampToLocaleISOString(counseling?.endTime ?? Timestamp.now());

	console.debug('startTime', startTime, 'endTime', endTime);
	let selectedSession = 'normal';

	let evaluationCategory = Object.entries(EvaluationCategory);

	// save counseling
	async function save() {
		if (!counseling || !client) return;
		try {
			saving = true;
			counseling.startTime = Timestamp.fromDate(new Date(startTime));
			counseling.endTime = Timestamp.fromDate(new Date(endTime));
			await saveCounseling(counseling, client);
			window.location = `/mc/clients/${client.id}?tab=Counselings`;
		} catch (error) {
			console.error('error on saving counseling', error);
		}
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
				</span>
			</div>
			<ClientGeneralInfoForm {client} />
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
				<Cell>
					<Select variant="outlined" label="Counseling Status" bind:value={counseling.status}>
						{#each COUNSELING_STATUS_TYPES as option}
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
						<div>Upload file</div>
						<FileUploader
							directory="counseling"
							metadata={{ description: 'Counseling files' }}
							allowedTypes={['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']}
							on:success={handleUploadSuccess}
							on:error={handleUploadError}
						/>

						<ImageList class="demo-list">
							{#each counseling.attachments.filter(a => a.status === 'a') as attachment}
								<div style="display:flex;align-items:center">
									<IconButton class="material-icons">attach_file</IconButton>
									<a href={attachment.url} target="_blank">{attachment.filename}</a>
									<IconButton class="material-icons" on:click={() => counseling.attachments = counseling.attachments.map((a) => a.docId === attachment.docId ? a.status='d' : a)}>delete</IconButton>	
								</div>
							{/each}
						</ImageList>
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
						on:SMUISelect:change={calculateEval}
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
						on:SMUISelect:change={calculateEval}
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
						on:SMUISelect:change={calculateEval}
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
						on:SMUISelect:change={calculateEval}
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
						on:SMUISelect:change={calculateEval}
					>
						{#each evaluationCategory as [key, value]}
							<Option value={key}>{value}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell span={12}>
					<div class="grid-title" style="display: inline-block;">
						<span style="color:blue; font-weight: bold; margin-right:4px;">Evaluation </span>
						<span style="font-weight: bold; margin-right:4px;">Total</span>: {catEvalTotal}
						<span style="font-weight: bold;">Average</span>:{catEvalAvg}
					</div>
				</Cell>
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
</style>
