<template>
  <component
    class="heading"
    :is="( decideTag() )"
    :class="( Object.assign({
      ['heading--' + vTheme]: vTheme
    }, classes[vTag]) )"
  >
    {{ vContent }}
  </component>
</template>

<script setup lang="ts">
  import { HEADING_TYPE } from "./HEADING_TYPE_ENUM"

  const classes: { [key: string]: string } = {
    "h1": "heading-1",
    "h2": "heading-2",
    "h3": "heading-3",
    "h4": "heading-4",
    "h5": "heading-5",
    "h6": "heading-6",
  }

  const decideTag = (): HEADING_TYPE => {
    if (Object.values(HEADING_TYPE).includes(props.vTag)) {
      return props.vTag
    }

    return HEADING_TYPE.ERROR
  }

  const props = withDefaults(defineProps<{
    vTag: HEADING_TYPE,
    vContent: string,
    vTheme?: string,
  }>(), {
    vTag: HEADING_TYPE.ERROR,
    vContent: "Heading"
  })
</script>

<style scoped lang="less">
  @import './Heading.less';
</style>