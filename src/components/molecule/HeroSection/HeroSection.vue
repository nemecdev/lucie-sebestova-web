<template>
  <div class="hero-section">
    <Heading class="hero-title" :v-type="( HEADING.h1 )" :v-content="( vHeroTitle )" />
    <Heading class="hero-title-sub" :v-type="( HEADING.h2 )" :v-content="( vHeroTitleSub )" />
    <Link class="hero-call-to-action-link" :href="( vHeroCallToActionHref )">
      {{ vHeroCallToActionLabel }}
    </Link>
  </div>
</template>

<script setup lang="ts">
  import { HEADING } from "@atom/Heading/E_HEADING";
  import Heading from "@atom/Heading/Heading.vue";
  import Link from "@atom/Link/Link.vue";

  withDefaults(defineProps<{
    vHeroTitle?: string,
    vHeroTitleSub?: string,
    vHeroCallToActionLabel?: string,
    vHeroCallToActionHref?: string,
  }>(), {
    vHeroTitle: 'Hero title',
    vHeroTitleSub: 'Hero Sub title',
    vCallToActionLabel: 'Action Link',
    vCallToActionHref: '',
  })
</script>

<style lang="less">
  @import "./HeroSection.less";
</style>