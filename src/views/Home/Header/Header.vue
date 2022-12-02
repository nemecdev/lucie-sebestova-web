<template>
  <div class="header"
       :class="{ 'header--under-modal': shouldBeHidden() }"
  >
    <LandingSection />
  </div>
</template>

<script setup lang="ts">
  import { MainStore } from '@stores/MainStore';

  import LandingSection from './parts/LandingSection.vue'

  const mainStore = MainStore()
  const shouldBeHidden = () => {
    return mainStore.getIsVisible('nav')
    || mainStore.getIsVisible('about-me-article')
  }
</script>

<style scoped lang="scss">
  .header {
    width: 100vw;
    padding: 0 $horizontalPadding;

    background: $secondaryColor;

    @include since-tablet-size {
      padding: 0;
    }
  }

  .header--under-modal {
    position: fixed;
  }
</style>