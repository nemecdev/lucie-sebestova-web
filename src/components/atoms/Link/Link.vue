<template>
  <a class="link" :class="( vClass )">
    <slot>
      Link
    </slot>
  </a>
</template>

<script setup lang="ts">
  defineProps<{
    vClass?: string
  }>()
</script>

<style scoped lang="less">
  @import './Link.less';
</style>