<template>
  <Flex
    class="header"
    vDirection="column"
    vJustify="flex-start"
    vAlignContent="center"
  >
    <div class="header__margin-top"></div>
    <Flex
      class="hero-section"
      vDirection="column"
      vJustify="center"
    >
      <Heading
        class="hero-section__heading"
        :v-tag="( HEADING_TYPE.H1 )"
        :v-content="( vHeroHeading )"
      />
      <Heading
        class="hero-section__heading-sub"
        :v-tag="( HEADING_TYPE.H2 )"
        :v-content="( vHeroHeadingSub )"
      />
      <Link
        class="hero-section__cta"
        vType="cta"
        vDataScroll=""
        :href="( vHeroCtaHref )"
        :v-content="( vHeroCtaTxt )"
        :v-theme="( '' )"
        :v-decoration="( false )"
        :v-call-to-action="( true )"
        :v-call-to-action-fill="( true )"
      />
    </Flex>
    <div
      class="header__img"
    ></div>
    <div class="header__margin-bottom"></div>
  </Flex>
</template>

<script setup lang="ts">
  import { HEADING_TYPE } from "@atom/Heading/HEADING_TYPE_ENUM"

  import Flex from "@atom/Flex/Flex.vue"
  import Heading from "@atom/Heading/Heading.vue"
  import Link from "@atom/Link/Link.vue"

  defineProps<{
    vHeroHeading: string,
    vHeroHeadingSub: string,
    vHeroCtaTxt: string,
    vHeroCtaHref: string,
  }>()
</script>

<style scoped lang="less">
  @import "./Header.less";
</style>