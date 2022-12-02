<template>
  <button class="icon-btn"
          :class="{
            'icon-btn--dark': vColorTheme === 'dark',
            'icon-btn--border': vBorder === true,
            'icon-btn--border-radius': vBorderRadius === true,
            'icon-btn--filled': vFill === true,
          }"
  >
    <slot name="svgIcon" />
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    vColorTheme?: string,
    vBorder?: boolean,
    vBorderRadius?: boolean,
    vFill?: boolean,
  }>()
</script>

<style scoped lang="less">
  @import './IconButton.less';
</style>