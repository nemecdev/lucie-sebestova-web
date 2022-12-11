<template>
  <component v-if="( Object.values(HEADING).includes(vType) )"
             :is="vType"
             v-bind="( $attrs )"
             class="heading"
  >
    {{ vContent }}
  </component>
  <span v-else>
    vType not in HEADING( ENUM )
  </span>
</template>

<script setup lang="ts">
  import { HEADING } from "@atom/Heading/E_HEADING"

  withDefaults(defineProps<{
    vType: HEADING,
    vContent?: string,
  }>(), {
    vContent: 'Heading'
  })
</script>

<style lang="less">
  @import './Heading.less';
</style>