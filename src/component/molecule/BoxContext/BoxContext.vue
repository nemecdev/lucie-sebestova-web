<template>
  <Flex
    class="box-context"
    vDirection="column"
    vAlignItems="flex-start"
  >
    <slot></slot>
  </Flex>
</template>

<script setup lang="ts">
import Flex from '@atom/Flex/Flex.vue';

</script>

<style scoped lang="less">
  @import "./BoxContext.less";
</style>