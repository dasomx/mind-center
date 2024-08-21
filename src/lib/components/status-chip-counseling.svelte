<script lang="ts">
	import { CounselingStatus } from '../types/index.d.js';

	export let status: CounselingStatus = CounselingStatus.Planned;
	const color = status === CounselingStatus.Planned ? 'magenta' : 
				(status === CounselingStatus.Canceled ? 'gray' : 'green');
</script>

<div style="background-color: {color}" class="chip">{status}</div>

<style>
	.chip {
		width: 85px;
		height: 24px;
		flex-grow: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
        color: white;
		padding: 0px 4px;
		border-radius: 100px;
        font-size: smaller;
	}
</style>
