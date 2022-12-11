<template>
  <slot>
    <img class="img-native"
         :class="( vClass )"
         :src="( vSrc )"
         :alt="( vAlt )"
         :width="( vWidth )"
         :height="( vHeight )"
    >
  </slot>
</template>

<script setup lang="ts">
  defineProps<{
    vClass?: string,
    vSrc?: string,
    vAlt?: string,
    vWidth?: string,
    vHeight?: string,
  }>()
</script>

<style scoped lang="less">
  @import './Img.less';
</style>