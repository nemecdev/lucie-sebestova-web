<template>
  <div class="content"
       :class="{ 'content--under-modal': shouldBeHidden() }"
       :style="(scrollPosStyle)"
  >
    <AboutMeSection class="content__part" />
    <AboutMeArticle class="content__part" :class="{ 'content__part--hidden': !mainStore.getIsVisible('about-me-article') }" />
    <Portfolio class="content__part" />
    <Contact class="content__part" />
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUpdate, onUpdated } from 'vue';
  import { MainStore } from '@stores/MainStore';

  import AboutMeSection from "./parts/AboutMeSection.vue"
  import AboutMeArticle from "./parts/AboutMeArticle.vue"
  import Portfolio from "./parts/Portfolio.vue"
  import Contact from "./parts/Contact.vue"

  onUpdated(() => {
    if (!shouldBeHidden()) {
      window.scrollTo(0, mainStore.getScrollPosY)
    }
  })

  onBeforeUpdate(() => {
    if (scrollPosY !== 0) {
      scrollPosStyle = 'top: ' + (scrollPosY) * -1 + 'px;'
      mainStore.setScrollPosY(scrollPosY)
    }
  })

  window.addEventListener('scroll', scrollToLastPosY)
  window.addEventListener('touchmove', scrollToLastPosY)

  function scrollToLastPosY () {
    scrollPosY = window.scrollY
  }

  const mainStore = MainStore()
  const shouldBeHidden = () => {
    return mainStore.getIsVisible('nav')
    || mainStore.getIsVisible('about-me-article')
  }

  let scrollPosY: number = 0
  let scrollPosStyle: string = ''
</script>

<style scoped lang="scss">
  .content {
    overflow-y: auto;
  }

  .content__part {
    padding: 50px $horizontalPadding;

    @include since-tablet-size {
      padding-top: 100px;
      padding-bottom: 100px;
    }

    @include since-computer-size {
      padding: 150px 10vw;

      &.about-me-section {
        padding-bottom: 0;
      }

      &.portfolio {
        padding: 150px 0;
      }
    }
  }

  .content--under-modal {
    z-index: 1;

    position: fixed;
    overflow-y: hidden;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .content__part--hidden {
    display: none;
  }
</style>