<template>
  <div class="footer"
       :class="{ 'footer--hidden': shouldBeHidden() }"
  >
    Web vytvořil &nbsp; - &nbsp;
    <a class="link" href="https://nemecdev.tech" target="_blank">nemecdev.tech</a>
    &nbsp; | &nbsp;
    <a class="link" href="mailto:nemec.karel.r93@gmail.com" target="_blank">email</a>
  </div>
</template>

<script setup lang="ts">
  import { MainStore } from '@stores/MainStore';

  const mainStore = MainStore()
  const shouldBeHidden = () => {
    return mainStore.getIsVisible('nav')
           || mainStore.getIsVisible('about-me-article')
  }
</script>

<style scoped lang="scss">
  $linkColor: #bec3ff;
  $linkHoverColor: #d8dbff;
  $linkActiveColor: #8f7fa3;

  .footer {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    padding: 10px 0;

    background: $secondaryColor;

    border-top: 2px solid $primaryColor;

    color: $primaryColor;
    font-size: 0.8rem;

    @include link-default();
  }

  .footer--hidden {
    display: none;
  }
</style>