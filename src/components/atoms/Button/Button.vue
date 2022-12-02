<template>
  <button class="btn" :class="( vClass )">
    <slot>
      Click me
    </slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    vClass?: string
  }>()
</script>

<style scoped lang="less">
  @import './Button.less';
</style>