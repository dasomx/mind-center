<script lang="ts">
	import AssessmentForm from "$lib/components/assessment-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { client } = data.props;

    console.debug('client ', client);
</script>

<AssessmentForm client={client}  assessment={null} />
