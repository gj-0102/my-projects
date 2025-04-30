<script lang="ts">
  import { page } from '$app/stores';
</script>

<header>
  <div class="container">
    <div class="logo">
      <a href="/">🍔 Fast Food Tracking</a>
    </div>
    <nav>
      <div class="nav-links">
        <div class="nav-item">
          <a href="/">Home</a>
        </div>
        <div class="nav-item">
          <a href="/orders">Orders</a>
        </div>
      </div>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-item a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-item a:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;
      padding: 1rem;
    }

    .nav-links {
      margin-top: 1rem;
      gap: 1rem;
    }
  }
</style>