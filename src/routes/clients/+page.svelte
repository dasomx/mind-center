<script>
	import TextField from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import List, { Item, Text } from '@smui/list';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button from '@smui/button';
	import {
		DISASTER_TYPES,
		GENDERS,
		JOBS,
		DISASTER_VICTIM_TYPES,
		REFER_TO,
		RESULT_OF_ACTION
	} from '$lib/config';
	import { onMount } from 'svelte';

	let disasterName = '';
	let disasterType = '';
	let fatherName = '';
	let name = '';
	let gender = '';
	let dob = '';
	let cnicNumber = '';
	let code = '';
	let contactNoHome = '';
	let mobile = '';
	let address = '';
	let job = '';
	let schoolName = '';
	let grade = '';
	let companyName = '';
	let otherJobs = '';
	let disasterVictimType = '';
	let referTo = '';
	let resultOfAction = '';

	onMount(() => {
		// 필요한 초기화 작업을 여기에 작성합니다.
	});

	function clearForm() {
		// 폼 초기화 로직을 여기에 작성합니다.
		disasterName = '';
		disasterType = '';
		fatherName = '';
		name = '';
		gender = '';
		dob = '';
		cnicNumber = '';
		code = '';
		contactNoHome = '';
		mobile = '';
		address = '';
		job = '';
		schoolName = '';
		grade = '';
		companyName = '';
		disasterVictimType = '';
		referTo = '';
		resultOfAction = '';
	}

	function submitForm() {
		// 폼 제출 로직을 여기에 작성합니다.
		console.log({
			disasterName,
			disasterType,
			fatherName,
		});
	}
</script>

<div>
	<h1>General Counseling Registration</h1>

	<div class="grid-container">
		<TextField label="Disaster Name" bind:value={disasterName} required />
		<Select label="Disaster Type" bind:value={disasterType}>
			{#each DISASTER_TYPES as type (type)}
				<Option value={type}>{type}</Option>
			{/each}
		</Select>
		<TextField label="Father Name" bind:value={fatherName} />
		<TextField label="Name" bind:value={name} required />
		<Select label="Gender" bind:value={gender}>
			{#each GENDERS as type (type)}
				<Option value={type}>{type}</Option>
			{/each}
		</Select>
		<TextField label="DoB" bind:value={dob} type="date" />
		<TextField label="CNIC Number" bind:value={cnicNumber} required />
		<TextField label="Code (system)" bind:value={code} />
		<TextField label="Contact No. / Home" bind:value={contactNoHome} />
		<TextField label="Mobile" bind:value={mobile} />
		<TextField label="Address" bind:value={address} />
	</div>

	<!-- 추가 정보 -->
	<div>
		<div>
			<Select label="Job" bind:value={job}>
				{#each JOBS as type (type)}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
			{#if job === 'Student'}
				<TextField label="School Name" bind:value={schoolName} />
				<TextField label="Grade" bind:value={grade} />
			{:else if job === 'Job / Work'}
				<TextField label="Company Name" bind:value={companyName} />
			{:else if job === 'Others'}
				<TextField label="Other jobs" bind:value={otherJobs} />
			{/if}
		</div>
		<div>
			<Select label="Disaster Victim type" bind:value={disasterVictimType} required>
				{#each DISASTER_VICTIM_TYPES as type (type)}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
		</div>
		<div>
			<Select label="Refer to" bind:value={referTo}>
				{#each REFER_TO as type (type)}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
		</div>
		<div>
			<Select label="Result of action" bind:value={resultOfAction}>
				{#each RESULT_OF_ACTION as type (type)}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
		</div>
		<LayoutGrid class="grid-container">
			<Cell>
				<Button variant="outlined" on:click={clearForm}>Clear</Button>
				<Button variant="unelevated" on:click={submitForm}>Submit</Button>
			</Cell>
		</LayoutGrid>
	</div>
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
</style>
