<script>
  export let text = "";
</script>

<div>
  {#each text.split('\n') as line, index}
    <span>{line}</span><br />
  {/each}
</div>