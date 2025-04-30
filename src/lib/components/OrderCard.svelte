<script lang="ts">
  import { formatDistance } from 'date-fns';
  import { enUS } from 'date-fns/locale';

  export let order;

  const statusText = {
    preparing: 'Preparing',
    cooking: 'Cooking',
    delivering: 'Delivering',
    delivered: 'Delivered'
  };

  $: timeAgo = formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true, locale: enUS });
</script>

<div class="order-card">
  <div class="order-header">
    <div class="order-id">Order #{order.id}</div>
    <div class="order-time">{timeAgo}</div>
  </div>
  <div class="order-customer">
    <strong>Customer:</strong> {order.customerName}
  </div>
  <div class="order-address">
    <strong>Delivery Address:</strong> {order.deliveryAddress}
  </div>
  <div class="order-items">
    <strong>Items:</strong>
    <ul>
      {#each order.items as item}
        <li>{item.quantity}x {item.name} - ${item.price}</li>
      {/each}
    </ul>
  </div>
  <div class="order-footer">
    <div class="order-total">
      <strong>Total:</strong> ${order.totalPrice}
    </div>
    <div class="order-status status-{order.status}">
      <span class="status-dot"></span>
      {statusText[order.status]}
    </div>
  </div>
  <div class="order-actions">
    <a href={`/tracking/${order.id}`} class="track-order">Track Order</a>
  </div>
</div>

<style lang="scss">
  .order-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .order-id {
    font-weight: bold;
    color: #007bff;
  }

  .order-time {
    color: #666;
    font-size: 0.875rem;
  }

  .order-customer,
  .order-address {
    margin-bottom: 0.5rem;
  }

  .order-items {
    margin: 0.75rem 0;
  }

  .order-items ul {
    list-style: none;
    margin-top: 0.5rem;
  }

  .order-items li {
    padding: 0.25rem 0;
    border-bottom: 1px dashed #f0f0f0;
  }

  .order-items li:last-child {
    border-bottom: none;
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #f0f0f0;
  }

  .order-total {
    font-size: 1.1rem;
  }

  .order-status {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  .status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .status-preparing .status-dot {
    background-color: #f39c12;
  }

  .status-cooking .status-dot {
    background-color: #e74c3c;
  }

  .status-delivering .status-dot {
    background-color: #3498db;
  }

  .status-delivered .status-dot {
    background-color: #2ecc71;
  }

  .order-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .track-order {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.875rem;
    background-color: #007bff;
    color: white;
  }

  .track-order:hover {
    background-color: #0056b3;
  }
</style>