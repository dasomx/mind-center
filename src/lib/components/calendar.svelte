<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import DayGrid from '@event-calendar/day-grid';

	import '@event-calendar/core/index.css';
	import { onMount } from 'svelte';

	let calendar: any;

	onMount(() => {
		calendar = Calendar;
	});

	let plugins = [DayGrid];
	let options = {
		view: 'dayGridMonth',
		events: [
			// your list of events
		]
	};

</script>

{#if calendar}
	<Calendar {plugins} {options} />
{/if}