<script lang="ts">
	import LinkForm from "$lib/components/link-form.svelte";
	import { INIT_LINK } from "$lib/config";
    export let data;
    const { clientId, client } = data.props;
    const initData = {...INIT_LINK, clientId}

</script>
<div>
    <div>
        <LinkForm link={initData} client={client} mode="Add New"/>
    </div>
</div>