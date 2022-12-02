<template>
  <Flex
    class="link-group"
    vWrap
  >
    <Link
      v-for="(OLink, Id) in vLinks"
      :key="( Id )"
      :href="( OLink.getHref() )"
      :target="( OLink.getTarget() )"
      :v-content="( OLink.getLabel() )"
      :v-decoration="( vLinkDecoration )"
      :v-theme="( vLinkTheme )"
      :class="{
        [vLinkClass + '']: vLinkClass,
        'link--active': OLink.getIsActive()
      }"
      :v-data-scroll="( vLinkDataScroll )"
      @click="( handleLinkClick(OLink) )"
    />
  </Flex>
</template>

<script setup lang="ts">
  import Flex from "@atom/Flex/Flex.vue"
  import Link from "@atom/Link/Link.vue"
  import { LinkInterface as ILink } from "@atom/Link/LinkInterface";

  withDefaults(defineProps<{
    vLinks: Array<ILink>,
    vLinkClass?: string,
    vLinkDecoration?: boolean,
    vLinkTheme?: string,
    vLinkDataScroll?: string, // 3rd party sweet-scroll
  }>(), {
    vLinkDecoration: true,
  })

  const emit = defineEmits<{
    (e: 'event:linkClick', link: ILink): void
  }>()

  const handleLinkClick = (link: ILink) => {
    emit('event:linkClick', link)
  }
</script>

<style scoped lang="less">
  @import "./LinkGroup.less";
</style>