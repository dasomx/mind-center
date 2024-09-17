<script lang="ts">
	import AssessmentForm from "$lib/components/assessment-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { client, assessment } = data.props;

    console.debug('client ', client, 'assessment ', assessment);
</script>

<AssessmentForm client={client}  assessment={assessment} />
