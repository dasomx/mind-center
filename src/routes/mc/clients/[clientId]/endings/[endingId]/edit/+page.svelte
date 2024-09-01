<script lang="ts">
	import EndingSessionForm from "$lib/components/ending-session-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { client, ending } = data.props; 

    console.debug('data ', data);
</script>

<EndingSessionForm client={client} ending={ending}/>
