<script lang="ts">
	import ClientForm from "$lib/components/client-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;

    console.log('data ', data);
</script>

<ClientForm data={data.props.client}/>
