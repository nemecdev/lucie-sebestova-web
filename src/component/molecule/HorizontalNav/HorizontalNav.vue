<template>
  <nav
    class="horizontal-nav"
    :class="{
      ['horizontal-nav--' + vTheme]: vTheme
    }"
  >
    <LinkGroup
      class="horizontal-nav__links horizontal-nav__route-links"
      :v-links="( vRouteLinks )"
      :v-link-decoration="( false )"
      @event:link-click="( handleLinkClick )"
      vLinkDataScroll=""
    />
    <div class="horizontal-nav__flex-expand"></div>
    <LinkGroup
      class="horizontal-nav__links horizontal-nav__embedded-links"
      :v-links="( vEmbeddedLinks )"
      :v-link-decoration="( false )"
    />
    <LinkGroup
      class="horizontal-nav__links horizontal-nav__social-links"
      :v-links="( vSocialLinks )"
      :v-link-decoration="( false )"
    />
  </nav>
</template>

<script setup lang="ts">
  import { LinkInterface as ILink } from "@atom/Link/LinkInterface"

  import LinkGroup from "@molecule/LinkGroup/LinkGroup.vue"

  const props = defineProps<{
    vRouteLinks: Array<ILink>,
    vEmbeddedLinks: Array<ILink>,
    vSocialLinks: Array<ILink>,
    vTheme?: string,
  }>()

  const deactivateLinks = () => {
    props.vRouteLinks.forEach((link: ILink) => {
      link.setIsActive(false)
    })
  }

  const handleLinkClick = (link: ILink) => {
    deactivateLinks()
    link.setIsActive(true)
  }
</script>

<style scoped lang="less">
  @import "./HorizontalNav.less";
</style>