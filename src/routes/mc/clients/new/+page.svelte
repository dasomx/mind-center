<script lang="ts">
	import ClientForm from "$lib/components/client-form.svelte";
	import { INIT_CLIENT } from "$lib/config";

</script>
<div>
    <h5>Add new client</h5>
    <div>
        <ClientForm data={INIT_CLIENT}/>
    </div>
</div>