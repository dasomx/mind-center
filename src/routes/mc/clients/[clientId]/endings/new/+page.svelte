<script lang="ts">
	import EndingSessionForm from "$lib/components/ending-session-form.svelte";
	import LinkForm from "$lib/components/link-form.svelte";
	import { INIT_ENDING_SESSION } from "$lib/config";
    export let data;
    const { clientId, client } = data.props;
    const initData = {...INIT_ENDING_SESSION, clientId}

</script>
<div>
    <span class="Page-header">
        Add New Ending
      </span>
    <div>
        <EndingSessionForm ending={initData} client={client}/>
    </div>
</div>

<style>
.Page-header {
  height: 42px;
  align-self: stretch;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 34px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.24;
  letter-spacing: 0.25px;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
}
</style>