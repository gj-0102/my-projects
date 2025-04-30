<script lang="ts">
  export let name = '';
  export let size = '1rem';
</script>

<span class="icon" style="font-size: {size}">
  {#if name === 'location'}
    📍
  {:else if name === 'clock'}
    ⏰
  {:else}
    ❓
  {/if}
</span>

<style lang="scss">
  .icon {
    display: inline-block;
  }
</style>