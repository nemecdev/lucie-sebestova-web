<template>
  <button
    class="btn"
    :class="{
      ['btn--' + vTheme]: vTheme
    }"
  >
    <span class="btn__content">
      {{ vContent }}
    </span>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    vContent: string,
    vTheme?: string,
  }>()
</script>

<style scoped lang="less">
  @import './Button.less';
</style>