<template>
  <div class="home-temlpate">
    <Nav class="nav--horizontal"
         :class="{ 'nav--hidden': !store.getIsVisible('nav')}"
         :v-internal-links="( internalLinks )"
         :v-social-links="( socialLinks )"
    />
    <Button @click="store.toggleVisibility('nav')"
            class="nav-toggle-btn"
    />
    <Header :class="{ 'header--hidden': store.getIsVisible('nav') }"
            :v-hero-title="( vHeroTitle )"
            :v-hero-title-sub="( vHeroTitleSub )"
            :v-hero-call-to-action-label="( vHeroCallToActionLabel )"
            :v-hero-call-to-action-href="( vHeroCallToActionHref )"
            :v-img-src="( vImgSrc )"
            :v-img-alt="( vImgAlt )"
    />
    <section class="section-about">
    </section>
    <section class="section-portfolio">
    </section>
    <section class="section-contact">
    </section>
    <footer class="footer">
    </footer>
  </div>
</template>

<script setup lang="ts">
  import Nav from "@organism/Nav/Nav.vue"
  import Header from "@organism/Header/Header.vue"

  import Button from "@atom/Button/Button.vue"

  import { useStore } from "@stores/Store"

  const store = useStore()
  const internalLinks = store.getInternalLinks
  const socialLinks = store.getSocialLinks

  defineProps<{
    vHeroTitle?: string,
    vHeroTitleSub?: string,
    vHeroCallToActionLabel?: string,
    vHeroCallToActionHref?: string,
    vImgSrc?: string,
    vImgAlt?: string,
    vImgWidth?: string,
    vImgHeight?: string,
  }>()
</script>

<style lang="less">
  @import './Home.less';
</style>