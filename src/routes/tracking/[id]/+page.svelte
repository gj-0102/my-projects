<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getOrder } from '$lib/services/api';
  import TrackingMap from '$lib/components/TrackingMap.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import DeliveryTimer from '$lib/components/DeliveryTimer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const orderId = $page.params.id;
  let order = null;
  let error = null;

  async function loadOrderDetails() {
    try {
      order = await getOrder(orderId);
    } catch (err) {
      console.error('Failed to fetch order details', err);
      error = err;
    }
  }

  async function updateStatus(newStatus) {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      await loadOrderDetails();
    } catch (err) {
      console.error('Failed to update order status', err);
      error = err;
    }
  }

  onMount(loadOrderDetails);
</script>

<svelte:head>
  <title>Fast Food Delivery Tracking - Order {orderId}</title>
</svelte:head>

<div class="app">
  <Header />

  <main>
    <div class="tracking-page">
      {#if error}
        <div class="error-message">
          <h2>Order Not Found</h2>
          <p>Sorry, we couldn't find the order with ID "{orderId}".</p>
          <Button label="Back to Orders" variant="secondary" onClick={() => window.location.href = '/orders'} />
        </div>
      {:else if !order}
        <div class="loading">
          <p>Loading order information...</p>
        </div>
      {:else}
        <div class="tracking-container">
          <div class="order-info">
            <h1>Order #{order.id}</h1>
            <StatusBadge status={order.status} />

            <div class="delivery-info">
              <h2>Delivery Information</h2>
              <p>
                <Icon name="location" /> 
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p>
                <Icon name="location" /> 
                <strong>Address:</strong> {order.deliveryAddress}
              </p>
            </div>

            <div class="delivery-timer">
              <Icon name="clock" />
              <DeliveryTimer estimatedDeliveryTime={order.estimatedDeliveryTime} />
            </div>

            {#if order.status === 'preparing'}
              <Button label="Start Cooking" variant="primary" onClick={() => updateStatus('cooking')} />
            {:else if order.status === 'cooking'}
              <Button label="Start Delivering" variant="primary" onClick={() => updateStatus('delivering')} />
            {:else if order.status === 'delivering'}
              <Button label="Mark as Delivered" variant="primary" onClick={() => updateStatus('delivered')} />
            {/if}
          </div>

          <div class="map-container">
            <TrackingMap
              deliveryAddress={order.deliveryAddress}
              restaurantAddress={order.restaurant.address}
            />
          </div>
        </div>
      {/if}
    </div>
  </main>

  <Footer />
</div>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  .tracking-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .tracking-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .order-info {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  h2 {
    color: #666;
    margin: 1.5rem 0 1rem;
  }

  .delivery-info {
    margin: 1.5rem 0;
  }

  .delivery-info p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .delivery-timer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .map-container {
    height: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
  }

  .error-message {
    text-align: center;
    padding: 2rem;
  }

  .loading {
    text-align: center;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    .tracking-container {
      grid-template-columns: 1fr;
    }

    .map-container {
      height: 300px;
    }
  }
</style>