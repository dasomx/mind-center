<script lang="ts">
	import EndingSessionForm from "$lib/components/ending-session-form.svelte";
	import LinkForm from "$lib/components/link-form.svelte";
	import { INIT_ENDING_SESSION } from "$lib/config";
    export let data;
    const { clientId, client } = data.props;
    const initData = {...INIT_ENDING_SESSION, clientId}

</script>
<div>
    <div>
        <EndingSessionForm ending={initData} client={client} mode="Add New"/>
    </div>
</div> 