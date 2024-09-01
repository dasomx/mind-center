<script lang="ts">
	import ClientForm from "$lib/components/client-form.svelte";
	import LinkForm from "$lib/components/link-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { client, link } = data.props; 

    console.debug('data ', data);
</script>

<LinkForm client={client} link={link}/>
