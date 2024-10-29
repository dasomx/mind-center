<script lang="ts">
	import CounselingForm from "$lib/components/counseling-normal-form.svelte";

    /** @type {import('./$types').PageData}*/
    export let data;
    const { counseling, client } = data.props;

    console.debug('data ', data);
</script>

<span class="Page-header">
    <span class='title'>Counseling | </span><span class='subtitle'>Edit Session</span>
</span>

<CounselingForm client={client} counseling={counseling} />

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
    .title {
            font-weight: bold;
            font-size: 100%; 
        }
    .subtitle {
      font-weight: bold;
      font-size: 75%; 
    }
</style>