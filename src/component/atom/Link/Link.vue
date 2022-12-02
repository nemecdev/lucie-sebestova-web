<template>
  <a
    class="link"
    :class="{
      'link--no-decoration': !vDecoration,
      ['link--' + vTheme]: vTheme,
      'link--call-to-action': vCallToAction,
      'link--call-to-action-filled': vCallToActionFill,
    }"
    :data-scroll="vDataScroll ?? undefined"
  >
    <span class="link__content">
      {{ vContent }}
    </span>
  </a>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    vContent: string,
    vTheme?: string,
    vDecoration?: boolean,
    vCallToAction?: boolean,
    vCallToActionFill?: boolean,
    vDataScroll?: string, // 3rd party sweet-scroll
  }>(), {
    vContent: "Link",
    vTheme: '',
    vDecoration: true,
    vCallToAction: false,
    vCallToActionFill: false,
  })
</script>

<style scoped lang="less">
  @import './Link.less';
</style>