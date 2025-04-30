<script lang="ts">
  import { onMount } from 'svelte';
  import { Loader } from '@googlemaps/js-api-loader';

  export let deliveryAddress;
  export let restaurantAddress;

  let map;
  let directionsService;
  let directionsRenderer;
  let mapElement;
  let error = null;

  const GOOGLE_MAPS_API_KEY = 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'; 

  async function initMap() {
    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();

      const mapOptions = {
        center: { lat: 47.4979, lng: 19.0402 },
        zoom: 13,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
      };

      map = new google.maps.Map(mapElement, mapOptions);
      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer({ map, suppressMarkers: true });

      const geocoder = new google.maps.Geocoder();

      const restaurantLocation = await geocodeAddress(geocoder, restaurantAddress);
      const deliveryLocation = await geocodeAddress(geocoder, deliveryAddress);

      if (restaurantLocation && deliveryLocation) {
        new google.maps.Marker({
          position: restaurantLocation,
          map,
          icon: { url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', scaledSize: new google.maps.Size(40, 40) },
          title: 'Restaurant'
        });

        new google.maps.Marker({
          position: deliveryLocation,
          map,
          icon: { url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', scaledSize: new google.maps.Size(40, 40) },
          title: 'Delivery Address'
        });

        calculateRoute(restaurantLocation, deliveryLocation);
      } else {
        throw new Error('Failed to geocode addresses');
      }
    } catch (err) {
      console.error('Map initialization failed', err);
      error = 'Failed to load map';
    }
  }

  async function geocodeAddress(geocoder, address) {
    try {
      const result = await geocoder.geocode({ address });
      return result.results[0].geometry.location;
    } catch (err) {
      console.error('Geocoding failed:', err);
      return null;
    }
  }

  function calculateRoute(origin, destination) {
    directionsService.route(
      { origin, destination, travelMode: google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        }
      }
    );
  }

  onMount(initMap);
</script>

<div class="map-container">
  {#if error}
    <div class="map-error">{error}</div>
  {:else}
    <div class="map" bind:this={mapElement}></div>
  {/if}
</div>

<style lang="scss">
  .map-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }

  .map {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .map-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ff4b4b;
    font-weight: 500;
  }
</style>