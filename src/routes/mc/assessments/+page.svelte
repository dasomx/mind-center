<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { DISASTER_NAMES } from '$lib/config';
	import CounselingList from '$lib/components/counseling-list.svelte';
	import { type Counseling } from '$lib/types/index.d';
    import Snackbar, { Label, Actions } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
	import { searchCounseling } from '$lib/firebase/firebase.client';
	

	/** @type {import('./$types').PageData} */
	export let data;

	const { counselings } = data;
	
	let filteredCounselings: Counseling[] = counselings;

    let name: string = '';
	let disasterName: string = '';
	let mobile: string = '';
	let snackbarInfo: Snackbar;
	let information: string = '';

	function clearValues() {
		name = '';
		disasterName = '';
		mobile = '';
		filteredCounselings = counselings;
	}

	function showSnackbarInfo(info: string) {
		information = info;
		snackbarInfo.open();
	}

	async function search() {
		try {
			const data = await searchCounseling({ name, disasterName, mobile });
			console.debug('data', data);
			filteredCounselings = data;
		} catch (error) {
			showSnackbarInfo(error);
		}
	}


</script>

<div>
	<h6>Assessments</h6>
	<h5>Assessments</h5>
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
			<Button on:click={clearValues}>Clear</Button>
			<Button variant="raised" on:click={search} >Search</Button>
		</div>
	</div>

	<div class="list-container">
		<div class="list-header">
			<div>
			<span>Total</span>
			<span style="margin-left: 17px"><strong>{filteredCounselings.length}</strong></span>
			</div>
			<Button variant="raised" on:click={()=> {alert("Please do it from \"My Clients\" menu.")}}>Add Counseling</Button>
		</div>
		<CounselingList data={filteredCounselings.map((counseling, index)=>({no: index+1, ...counseling}))}/>
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
