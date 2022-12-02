<template>
  <div class="notification-panel"
       :class="{ 'notification-panel--hidden': !mainStore.getIsVisible('notification-panel') }"
  >
    <p class="message">{{ mainStore.getNotification }}</p>
  </div>
</template>

<script setup lang="ts">
  import { MainStore } from '@/stores/MainStore'
  const mainStore = MainStore()

</script>

<style scoped lang="scss">
  .notification-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;

    padding: 10px 50px;
    word-break: break-all;
    background: $primaryColor;
  }

  .notification-panel--hidden {
    display: none;
  }

  .message {
    color: $secondaryColor;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
</style>