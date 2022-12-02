<template>
  <div
    class="section-heading"
    :class="{
      'section-heading--dark': vTheme === 'dark'
    }"
  >
    <Heading
      class="heading--outlined"
      :v-tag="( HEADING_TYPE.H1 )"
      :v-content="( vHeadingTxt )"
    />
    <Heading
      class="heading--filled"
      :v-tag="( HEADING_TYPE.H1 )"
      :v-content="( vHeadingTxt )"
    />
  </div>
</template>

<script setup lang="ts">
  import { HEADING_TYPE } from "@atom/Heading/HEADING_TYPE_ENUM"
  import Heading from "@atom/Heading/Heading.vue"

  defineProps<{
    vHeadingTxt: string,
    vTheme?: string,
  }>()

</script>

<style scoped lang="less">
  @import "./SectionHeading.less";
</style>