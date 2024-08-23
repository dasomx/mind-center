<script lang="ts">
	import ClientForm from "$lib/components/client-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;

    console.log('data ', data);
</script>


<h1>Hello,{data.props.client.name}</h1>
<ClientForm data={data.props.client}/>
