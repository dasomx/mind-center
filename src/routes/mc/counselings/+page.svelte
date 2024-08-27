<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { DISASTER_NAMES } from '$lib/config';
	import CounselingList from '$lib/components/counseling-list.svelte';
	import { type Counseling } from '$lib/types/index.d';
    import Snackbar, { Label, Actions } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
	import { goto } from '$app/navigation';
	

	/** @type {import('./$types').PageData} */
	export let data;

	console.debug('data', data);

	const { counselings } = data;
	
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

    function calculateEndTime() {
        // Calculate the end time based on the start time
        // and update the endTime variable
    }

    function saveCounseling() {
        // Save all the input values to the database or perform any other necessary actions
    }

</script>

<div>
	<h6>My Counselings</h6>
	<h5>My Counselings</h5>
	<div class="search-container">
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
			<Button variant="raised" on:click={()=>showSnackbarInfo('미구현')} >Search</Button>
		</div>
	</div>

	<div class="list-container">
		<div class="list-header">
			<div>
			<span>Total</span>
			<span style="margin-left: 17px"><strong>{counselings.length}</strong></span>
			</div>
			<Button variant="raised" on:click={()=>goto('/mc/counselings/new')}>Add Counseling</Button>
		</div>
		<CounselingList data={counselings.map((counseling, index)=>({no: index+1, ...counseling}))}/>
	</div>
</div>
<Snackbar bind:this={snackbarInfo}>
  <Label
    >{information}</Label>
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
