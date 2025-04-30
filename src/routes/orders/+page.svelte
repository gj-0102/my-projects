<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import OrderCard from '$lib/components/OrderCard.svelte';
  import { getOrders } from '$lib/services/api';

  let orders: any[] = [];
  let activeFilter = 'all';

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'cooking', label: 'Cooking' },
    { key: 'delivering', label: 'Delivering' },
    { key: 'delivered', label: 'Delivered' }
  ];

  async function loadOrders() {
    try {
      orders = await getOrders();
    } catch (error) {
      console.error('Failed to load orders:', error);
      orders = [];
    }
  }

  $: filteredOrders = activeFilter === 'all' ? orders : orders.filter(order => order.status === activeFilter);
  $: filterCounts = {
    all: orders.length,
    preparing: orders.filter(order => order.status === 'preparing').length,
    cooking: orders.filter(order => order.status === 'cooking').length,
    delivering: orders.filter(order => order.status === 'delivering').length,
    delivered: orders.filter(order => order.status === 'delivered').length
  };

  onMount(loadOrders);
</script>

<svelte:head>
  <title>My Orders - Fast Food Delivery Tracking</title>
</svelte:head>

<div class="app">
  <Header />

  <main>
    <div class="orders-page">
      <h1>My Orders</h1>

      <div class="filters">
        {#each filters as filter}
          <button
            class={activeFilter === filter.key ? 'active' : ''}
            on:click={() => (activeFilter = filter.key)}
          >
            {filter.label} ({filterCounts[filter.key]})
          </button>
        {/each}
      </div>

      {#if filteredOrders.length === 0}
        <div class="no-orders">
          <p>No orders found.</p>
        </div>
      {:else}
        <div class="orders-list">
          {#each filteredOrders as order}
            <OrderCard {order} />
          {/each}
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

  .orders-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }

  .filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .filters button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .filters button:hover {
    background-color: #f0f0f0;
  }

  .filters .active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .no-orders {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .orders-list {
    display: grid;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .orders-page {
      padding: 1rem;
    }

    .filters {
      gap: 0.25rem;
    }

    .filters button {
      padding: 0.4rem 0.8rem;
      font-size: 0.875rem;
    }
  }
</style>