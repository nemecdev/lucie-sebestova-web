<template>
  <button class="nav-toggle-btn" @click="mainStore.toggleVisibility('nav')">
    <svg class="nav-toggle-btn__svg" width="40" height="40" viewBox="0 0 60 40">
      <path d="M57 0H3C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6H57C58.6569 6 60 4.65685 60 3C60 1.34315 58.6569 0 57 0Z"/>
      <path d="M57 17H3C1.34315 17 0 18.3431 0 20C0 21.6569 1.34315 23 3 23H57C58.6569 23 60 21.6569 60 20C60 18.3431 58.6569 17 57 17Z"/>
      <path d="M57 34H3C1.34315 34 0 35.3431 0 37C0 38.6569 1.34315 40 3 40H57C58.6569 40 60 38.6569 60 37C60 35.3431 58.6569 34 57 34Z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
  import { MainStore } from '@stores/MainStore';

  const mainStore = MainStore()
</script>

<style scoped lang="scss">
  .nav-toggle-btn {
    z-index: 3;

    position: fixed;
    bottom: 4rem;
    right: 2rem;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;

    background-color: #ffffffe1;
    border: none;
    border-radius: $borderRadius;

    color: $primaryColor;
    font-size: 2rem;
    text-decoration: none;
    cursor: pointer;

    @include since-computer-size {
      display: none;
    }
  }

  .nav-toggle-btn__svg {
    width: 1.8rem;
    fill: $secondaryColor;
  }
</style>