<script lang="ts">
	import ClientForm from "$lib/components/client-form.svelte";
	import { INIT_CLIENT } from "$lib/config";

</script>
<div>
    <div>
        <ClientForm data={INIT_CLIENT} mode="Add New"/>
    </div>
</div>