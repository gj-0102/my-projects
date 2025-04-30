<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { differenceInSeconds, parseISO } from 'date-fns';

  export let estimatedDeliveryTime;

  let remainingSeconds = 0;
  let displayMinutes = '00';
  let displaySeconds = '00';
  let interval;

  function updateTimer() {
    const now = new Date();
    const delivery = new Date(estimatedDeliveryTime);
    remainingSeconds = Math.max(0, differenceInSeconds(delivery, now));

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    displayMinutes = String(minutes).padStart(2, '0');
    displaySeconds = String(seconds).padStart(2, '0');
  }

  onMount(() => {
    updateTimer();
    interval = setInterval(updateTimer, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  $: progress = 100 - (remainingSeconds / (30 * 60)) * 100;
</script>

<div class="delivery-timer">
  <div class="timer-progress">
    <div class="progress-bar" style="width: {progress}%"></div>
  </div>

  {#if remainingSeconds <= 0}
    <div class="timer-status">Delivered</div>
  {:else}
    <div class="timer-info">
      <div>Time Remaining: <span class="timer-countdown">{displayMinutes}:{displaySeconds}</span></div>
      <div>Estimated Delivery: {new Date(estimatedDeliveryTime).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .delivery-timer {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .timer-progress {
    background: #f0f0f0;
    height: 8px;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: #4caf50;
    transition: width 0.3s ease;
  }

  .timer-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #333;
  }

  .timer-countdown {
    font-weight: bold;
    color: #ff4b4b;
  }

  .timer-status {
    color: #4caf50;
    font-weight: bold;
    text-align: center;
  }

  @media (max-width: 768px) {
    .timer-info {
      text-align: center;
    }
  }
</style>