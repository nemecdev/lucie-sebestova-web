<template>
  <h1 class="heading" :class="( vClass )" v-if="vType === HEADING.h1"><slot>Heading 1</slot></h1>
  <h2 class="heading" :class="( vClass )" v-else-if="vType === HEADING.h2"><slot>Heading 2</slot></h2>
  <h3 class="heading" :class="( vClass )" v-else-if="vType === HEADING.h3"><slot>Heading 3</slot></h3>
  <h4 class="heading" :class="( vClass )" v-else-if="vType === HEADING.h4"><slot>Heading 4</slot></h4>
  <h5 class="heading" :class="( vClass )" v-else-if="vType === HEADING.h5"><slot>Heading 5</slot></h5>
  <h6 class="heading" :class="( vClass )" v-else-if="vType === HEADING.h6"><slot>Heading 6</slot></h6>
  <span class="heading" :class="( vClass )" v-else><slot>WARNING: You forgot to set vType</slot></span>
</template>

<script setup lang="ts">
  import { HEADING } from "@atoms/Heading/E_HEADING"
  import { onBeforeMount } from "vue"

  const props = defineProps<{
    vClass?: string,
    vType: HEADING
  }>()

  onBeforeMount(() => {
    if (!props.vType) throw new Error('vType is required')
  })
</script>

<style scoped lang="less">
  @import './Heading.less';
</style>