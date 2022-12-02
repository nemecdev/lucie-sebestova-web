<template>
  <div class="flex"
      :class="{
        'flex--row': vDirection === 'row',
        'flex--row-reverse': vDirection === 'row-reverse',
        'flex--column': vDirection === 'column',
        'flex--column-reverse': vDirection === 'column-reverse',
        'flex--align-items-flex-start': vAlignItems === 'flex-start',
        'flex--align-items-flex-end': vAlignItems === 'flex-end',
        'flex--align-items-center': vAlignItems === 'center',
        'flex--align-items-stretch': vAlignItems === 'stretch',
        'flex--align-items-baseline': vAlignItems === 'baseline',
        'flex--align-items-space-evenly': vAlignItems === 'space-evenly',
        'flex--align-content-flex-start': vAlignContent === 'flex-start',
        'flex--align-content-flex-end': vAlignContent === 'flex-end',
        'flex--align-content-center': vAlignContent === 'center',
        'flex--align-content-stretch': vAlignContent === 'stretch',
        'flex--align-content-baseline': vAlignContent === 'baseline',
        'flex--align-content-space-between': vAlignContent === 'space-between',
        'flex--align-content-space-around': vAlignContent === 'space-around',
        'flex--align-content-space-evenly': vAlignContent === 'space-evenly',
        'flex--justify-flex-start': vJustify === 'flex-start',
        'flex--justify-flex-end': vJustify === 'flex-end',
        'flex--justify-center': vJustify === 'center',
        'flex--justify-stretch': vJustify === 'stretch',
        'flex--justify-baseline': vJustify === 'baseline',
        'flex--justify-space-between': vJustify === 'space-between',
        'flex--justify-space-around': vJustify === 'space-around',
        'flex--justify-space-evenly': vJustify === 'space-evenly',
        'flex--wrap': vWrap,
      }"
  >
    <slot>
      Flex content
    </slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    vDirection?: string,
    vAlignItems?: string,
    vAlignContent?: string,
    vJustify?: string,
    vWrap?: boolean,
  }>()
</script>

<style scoped lang="less">
  @import "./Flex.less";
</style>