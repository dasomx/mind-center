<script lang="ts">
	import CounselingForm from "$lib/components/counseling-normal-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { counseling, client } = data.props;

    console.debug('data ', data);
</script>

<CounselingForm client={client} counseling={counseling} />
