<script lang="ts">
  export let label = '';
  export let onClick = () => {};
  export let variant = 'primary';
</script>

<button class={variant} on:click={onClick}>
  {label}
</button>

<style lang="scss">
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .primary {
    background-color: #007bff;
    color: white;
  }

  .primary:hover {
    background-color: #0056b3;
  }

  .secondary {
    background-color: #f0f0f0;
    color: #333;
  }

  .secondary:hover {
    background-color: #e0e0e0;
  }
</style>