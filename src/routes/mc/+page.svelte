<!-- Dashboard -->
<script lang="ts">
	import SmallTable from '$lib/components/small-table.svelte';
	import SmallTableCounseling from '$lib/components/small-table-counseling.svelte';
	import Calendar from '$lib/components/calendar.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	console.debug('data', data);
	const { clients, counselings, links } = data;
</script>

<h4>Dashboard</h4>
<p>Welcome to the dashboard</p>
<div style="display: flex; flex-direction:column; gap: 16px">
	<div class="container">
		<div class="mc_dash_small_list">
			<div class="mc_dash_small_item_title">My Clients</div>
			<SmallTable data={clients} resource="clients"/>
		</div>
		<div class="mc_dash_small_list">
			<div class="mc_dash_small_item_title">Active Individual Counseling</div>
			<SmallTableCounseling data={counselings} resource="counselings"/>
		</div>
		<div class="mc_dash_small_list">
			<div class="mc_dash_small_item_title">Link/Refer List</div>
			<SmallTable data={links} resource="links"/>
		</div>
	</div>
	<div>
		<div class="mc_dash_small_list">
			<div class="mc_dash_small_item_title">Calendar</div>
			<Calendar />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-between; /* 필요에 따라 조정 */
		gap: 16px;
	}
	.mc_dash_small_list {
		flex: 1;
		background-color: white !important;
		padding: 24px;
		border-radius: 8px;
		border: solid 1px #e0e0e0;
		background-color: #fff;
	}
	.mc_dash_small_item_title {
		height: 32px;
		margin-bottom: 16px;
		align-self: stretch;
		flex-grow: 0;
		font-family: Roboto;
		font-size: 20px;
		font-weight: 500;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		letter-spacing: 0.15px;
		text-align: left;
		color: rgba(0, 0, 0, 0.87);
	}
</style>
