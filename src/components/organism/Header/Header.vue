<template>
  <header class="header">
    <HeroSection :v-hero-title="( vHeroTitle )"
                 :v-hero-title-sub="( vHeroTitleSub )"
                 :v-hero-call-to-action-label="( vHeroCallToActionLabel )"
                 :v-hero-call-to-action-href="( vHeroCallToActionHref )"
    />
    <Img :v-class="( vImgClass )"
         :v-src="( vImgSrc )"
         :v-alt="( vImgAlt )"
         :v-width="( vImgWidth )"
         :v-height="( vImgHeight )"
    />
  </header>
</template>

<script setup lang="ts">
  import HeroSection from "@molecule/HeroSection/HeroSection.vue"

  import Img from "@atom/Img/Img.vue"

  defineProps<{
    vHeroTitle?: string,
    vHeroTitleSub?: string,
    vHeroCallToActionLabel?: string,
    vHeroCallToActionHref?: string,
    vImgSrc?: string,
    vImgAlt?: string,
    vImgClass?: string,
    vImgWidth?: string,
    vImgHeight?: string,
  }>()
</script>

<style lang="less">
  @import "./Header.less";
</style>