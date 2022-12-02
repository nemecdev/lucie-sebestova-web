<template>
  <svg class="svg-icon"
       :class="{
          'svg-icon--small': vSize === 'small',
          'svg-icon--medium': vSize === 'medium',
          'svg-icon--large': vSize === 'large',
          'svg-icon--dark': vColorTheme === 'dark',
       }"
  >
    <path class="svg-icon__path"
          v-for="(path, id) in vPaths"
          :key="( id )"
          :d="( path )"
    />
  </svg>
</template>

<script setup lang="ts">
  defineProps<{
    vPaths: Array<string>
    vSize?: string,
    vColorTheme?: string,
  }>()
</script>

<style scoped lang="less">
  @import "./SvgIcon.less";
</style>