<template>
  <div class="content"
       :class="{ 'content--under-modal': shouldBeHidden() }"
       :style="(scrollPosStyle)"
  >
    <AboutMeSection class="content__part" />
    <AboutMeArticle class="content__part" :class="{ 'content__part--hidden': !store.getIsVisible('about-me-article') }" />
    <Portfolio class="content__part" />
    <Contact class="content__part" />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUpdate, onUpdated } from 'vue';
  import { useStore } from '@stores/Store';

  import AboutMeSection from "./parts/AboutMeSection.vue"
  import AboutMeArticle from "./parts/AboutMeArticle.vue"
  import Portfolio from "./parts/Portfolio.vue"
  import Contact from "./parts/Contact.vue"

  onUpdated(() => {
    if (!shouldBeHidden()) {
      window.scrollTo(0, store.getScrollPosY)
    }
  })

  onBeforeUpdate(() => {
    if (scrollPosY !== 0) {
      scrollPosStyle = 'top: ' + (scrollPosY) * -1 + 'px;'
      store.setScrollPosY(scrollPosY)
    }
  })

  window.addEventListener('scroll', scrollToLastPosY)
  window.addEventListener('touchmove', scrollToLastPosY)

  function scrollToLastPosY () {
    scrollPosY = window.scrollY
  }

  const store = useStore()
  const shouldBeHidden = () => {
    return store.getIsVisible('nav')
    || store.getIsVisible('about-me-article')
  }

  let scrollPosY: number = 0
  let scrollPosStyle: string = ''
</script>

<style scoped lang="less">
  .content__part--hidden {
    display: none;
  }
</style>