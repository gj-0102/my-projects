<script lang="ts">
  export const statusConfig = {
    preparing: { color: '#ffd700', text: 'Preparing' },
    cooking: { color: '#ff9900', text: 'Cooking' },
    delivering: { color: '#4caf50', text: 'Delivering' },
    delivered: { color: '#2196f3', text: 'Delivered' }
  };

  export let status = 'preparing';
</script>

<div class="status-badge" style="color: {statusConfig[status].color};">
  <span class="status-dot"></span>
  <span class="status-text">{statusConfig[status].text}</span>
</div>

<style lang="scss">
  .status-badge {
    display: inline-flex;
    align-items: center;
    background-color: #f0f0f0;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    margin-right: 0.5rem;
  }

  .status-text {
    letter-spacing: 0.5px;
  }
</style>