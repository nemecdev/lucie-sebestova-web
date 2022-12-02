<template>
  <nav
    class="vertical-nav"
    :class="{ 'vertical-nav--hidden': !isVisible }"
  >
    <Flex
      class="vertical-nav__content-wrapper"
      :class="{ 'vertical-nav__content-wrapper--hidden': !isVisible }"
      vDirection="column-reverse"
      vJustify="flex-start"
      vAlignItems="stretch"
    >
      <div class="vertical-nav__flex-expand-top"></div>
      <Heading
        v-if="( vHeadingTxt )"
        class="vertical-nav__heading"
        :v-tag="( HEADING_TYPE.H1 )"
        :v-content="( vHeadingTxt )"
      />
      <LinkGroup
        class="vertical-nav__links vertical-nav__route-links"
        :v-links="( vRouteLinks )"
        :v-link-decoration="( false )"
        @event:link-click="( handleLinkClick )"
        vLinkDataScroll=""
      />
      <LinkGroup
        class="vertical-nav__links vertical-nav__embedded-links"
        :v-links="( vEmbeddedLinks )"
        :v-link-decoration="( false )"
        @click="( toggleNav )"
      />
      <LinkGroup
        class="vertical-nav__links vertical-nav__social-links"
        :v-links="( vSocialLinks )"
        :v-link-decoration="( false )"
        @click="( toggleNav )"
      />
      <IconButton
        class="vertical-nav__close-btn"
        vColorTheme="dark"
        @click="( toggleNav )"
      >
        <template #svgIcon>
          <CloseIcon />
        </template>
      </IconButton>
      <div class="vertical-nav__flex-expand-bottom"></div>
    </Flex>
    <IconButton
      vFill
      vBorderRadius
      class="vertical-nav__menu-btn"
      :class="{ 'vertical-nav__menu-btn--hidden': isVisible }"
      @click="( toggleNav )"
    >
      <template #svgIcon>
        <MenuIcon vSize="small" />
      </template>
    </IconButton>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import { LinkInterface as ILink } from "@atom/Link/LinkInterface"
  import { HEADING_TYPE } from "@atom/Heading/HEADING_TYPE_ENUM"

  import Heading from "@atom/Heading/Heading.vue"
  import Flex from "@atom/Flex/Flex.vue"
  import LinkGroup from "@molecule/LinkGroup/LinkGroup.vue"
  import IconButton from "@atom/IconButton/IconButton.vue"
  import CloseIcon from "@atom/SvgIcon/Icons/CloseIcon.vue"
  import MenuIcon from "@atom/SvgIcon/Icons/MenuIcon.vue"

  const props = defineProps<{
    vRouteLinks: Array<ILink>,
    vEmbeddedLinks: Array<ILink>,
    vSocialLinks: Array<ILink>,
    vHeadingTxt?: string,
  }>()

  const emit = defineEmits<{
    (e: "visibility:toggle", visibility: boolean): void
  }>()

  const toggleNav = (e: Event) => {
    isVisible.value = !isVisible.value

    emit("visibility:toggle", isVisible.value)
  }

  const deactivateLinks = () => {
    props.vRouteLinks.forEach((link: ILink) => {
      link.setIsActive(false)
    })
  }

  const handleLinkClick = (link: ILink) => {
    isVisible.value = !isVisible.value

    deactivateLinks()
    link.setIsActive(true)

    emit("visibility:toggle", isVisible.value)
  }

  let isVisible = ref(false)
</script>

<style scoped lang="less">
  @import "./VerticalNav.less";
</style>