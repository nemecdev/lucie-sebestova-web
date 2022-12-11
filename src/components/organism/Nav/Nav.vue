<template>
  <div class="nav">
    <LinkGroup :v-links="vInternalLinks" class="internal-links" />
    <LinkGroup :v-links="vSocialLinks" class="social-links" />
  </div>
</template>

<script setup lang="ts">
  import LinkGroup from "@molecule/LinkGroup/LinkGroup.vue"

  import { ILink } from "@atom/Link/Link"

  defineProps<{
    vInternalLinks?: Array<ILink>,
    vSocialLinks?: Array<ILink>,
  }>()
</script>

<style lang="less">
  @import './Nav.less';
</style>