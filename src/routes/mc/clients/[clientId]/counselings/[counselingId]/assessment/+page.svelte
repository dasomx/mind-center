<script lang="ts">
	import AssessmentAdultForm from "$lib/components/assessment-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { counseling, client } = data.props;

    console.debug('data ', data);
</script>

<AssessmentAdultForm client={client} counseling={counseling} />
