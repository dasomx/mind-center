<script lang="ts">
	import LinkForm from "$lib/components/link-form.svelte";
	import { INIT_LINK } from "$lib/config";
    export let data;
    const { clientId, client } = data.props;
    const initData = {...INIT_LINK, clientId}

</script>
<div>
    <span class="Page-header">
        Add New Link
      </span>
    <div>
        <LinkForm link={initData} client={client}/>
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