<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Button from '$lib/components/Button.svelte';
  import { getWeather } from '$lib/services/api';

  let weatherData: any = null;
  let weatherLoading = false;
  let weatherError = false;

  async function fetchWeather() {
    try {
      weatherLoading = true;
      weatherError = false;
      weatherData = await getWeather('Budapest');
      if (!weatherData?.main || !weatherData?.weather?.[0]) {
        throw new Error('Invalid weather data');
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      weatherError = true;
      weatherData = null;
    } finally {
      weatherLoading = false;
    }
  }

  onMount(fetchWeather);
</script>

<svelte:head>
  <title>Fast Food Delivery Tracking - Home</title>
</svelte:head>

<div class="app">
  <Header />

  <main>
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <h1>Fast Food Delivery Tracking</h1>
          <p>Order Easily, Track in Real-Time, Enjoy Your Favorite Food</p>

          {#if weatherLoading}
            <div class="weather-info">
              <span>Loading Weather...</span>
            </div>
          {:else if weatherError}
            <div class="weather-info">
              <span>Unable to Load Weather Data</span>
            </div>
          {:else if weatherData}
            <div class="weather-info">
              <span class="weather-icon">
                {weatherData.weather[0].main === 'Clear' ? '☀️' :
                 weatherData.weather[0].main === 'Clouds' ? '☁️' :
                 weatherData.weather[0].main === 'Rain' ? '🌧️' :
                 weatherData.weather[0].main === 'Snow' ? '❄️' : '🌤️'}
              </span>
              <span class="weather-temp">
                Budapest Today {Math.round(weatherData.main.temp)}°C
              </span>
            </div>
          {/if}

          <Button label="View Orders" variant="primary" onClick={() => window.location.href = '/orders'} />
        </div>
      </section>
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
    padding-top: 1rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero {
    background-color: #007bff;
    padding: 2rem 0;
    margin-bottom: 1rem;
    border-radius: 8px;
    text-align: center;
    color: white;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .hero p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 1rem;
  }

  .weather-info {
    display: inline-flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 16px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .weather-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 1.5rem;
    }

    .hero p {
      font-size: 0.9rem;
    }
  }
</style>