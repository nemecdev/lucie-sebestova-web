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
  import { useStore } from '@stores/Store';

  const store = useStore()
  const shouldBeHidden = () => {
    return store.getIsVisible('nav')
           || store.getIsVisible('about-me-article')
  }
</script>

<style scoped lang="less">
</style>