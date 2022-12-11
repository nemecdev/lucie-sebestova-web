<template>
  <article id="about-me" class="about-me-section">
    <header>
      <h1>O mě</h1>
      <h2>O mě</h2>
    </header>
    <p class="about-me-section__content">
      <strong>K</strong>reativní grafička s více než pětiletou zkušeností v oblasti předtiskové přípravy a se znalostmi přesahující do oblastí
      e-commerce a správy sociálních sítí
      <br /><br />
      <strong>N</strong>ásledující cíl je zlepšit své schopnosti v oblastech grafiky pro online prostředí, copywritingu, sociálních sítích a online marketingu
    </p>
    <p class="about-me-section__content-rest"
       :class="{ 'about-me-section__content-rest--hidden': !store.getIsVisible('about-me-section__content-rest') }"
    >
      <b>D</b>říve jsem pracovala v copycentru, kde jsem prakticky využila svého vzdělání.
      Vypracovala jsem se až na post vedoucí prodejny v Brně.
      <br /><br />
      <b>P</b>o práci v copycentru přišla výzva vytvořit e-shop pro prodej textilních produktů.
      Přišla jsem při té příležitosti do styku se základy marketingu a řešení eshopu postaveném na shoptetu.
      <br /><br />
    </p>
    <span class="about-me-section__show-btn"
          @click="store.toggleVisibility('about-me-section__content-rest')"
    >
      {{ store.getIsVisible('about-me-section__content-rest') ? 'Zobrazit méně ...' : 'Zobrazit více ...' }}
    </span>
    <div class="about-me-section__cta-group">
      <CallToActionButton class="link open-article-btn" inner-txt="Celý článek" :click-call="() => store.unhide('about-me-article')" />
      <CallToActionButton class="link download-cv-btn" inner-txt="Stáhnout CV" :link-href="CV_FILE" target="_blank" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import { useStore } from '@stores/Store'
  import CallToActionButton from "@components/CallToActionButton.vue"

  const CV_FILE = import.meta.env.VITE_ASSETS_CV_FILE
  const store = useStore()
</script>

<style scoped lang="less">
</style>