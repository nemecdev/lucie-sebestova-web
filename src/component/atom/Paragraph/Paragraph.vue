<template>
  <p
    class="paragraph"
    :class="{
      ['paragraph--' + vTheme]: vTheme
    }"
  >
    <slot>
      Paragraph content
    </slot>
  </p>
</template>

<script setup lang="ts">
  defineProps<{
    vTheme?: string,
  }>()
</script>

<style scoped lang="less">
  @import './Paragraph.less';
</style>