<script lang="ts">
	import { type Counseling } from '$lib/types/index.d.ts';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import Radio from '@smui/radio';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import {
		DISASTER_NAMES,
		DISASTER_TYPES,
		DISASTER_VICTIM_TYPES,
		REFER_TO,
		INIT_COUNSELING
	} from '$lib/config';

	let data: Counseling = INIT_COUNSELING;
	console.log('data ', data);

	let selectedSession = 'normal';
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
					label="DateTime-Local"
					type="datetime-local"
    			/>
			</Cell>
			<Cell>
				
			</Cell>
			<Cell>
				<Textfield label="End Time" variant="outlined" type="time"/>
			</Cell>

		</LayoutGrid>
		
		<div class="grid-title">Information Provider</div>
		<LayoutGrid class="grid-container">
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