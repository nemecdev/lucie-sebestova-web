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
       :class="{ 'about-me-section__content-rest--hidden': !mainStore.getIsVisible('about-me-section__content-rest') }"
    >
      <b>D</b>říve jsem pracovala v copycentru, kde jsem prakticky využila svého vzdělání.
      Vypracovala jsem se až na post vedoucí prodejny v Brně.
      <br /><br />
      <b>P</b>o práci v copycentru přišla výzva vytvořit e-shop pro prodej textilních produktů.
      Přišla jsem při té příležitosti do styku se základy marketingu a řešení eshopu postaveném na shoptetu.
      <br /><br />
    </p>
    <span class="about-me-section__show-btn"
          @click="mainStore.toggleVisibility('about-me-section__content-rest')"
    >
      {{ mainStore.getIsVisible('about-me-section__content-rest') ? 'Zobrazit méně ...' : 'Zobrazit více ...' }}
    </span>
    <div class="about-me-section__cta-group">
      <CallToActionButton class="link open-article-btn" inner-txt="Celý článek" :click-call="() => mainStore.unhide('about-me-article')" />
      <CallToActionButton class="link download-cv-btn" inner-txt="Stáhnout CV" :link-href="CV_FILE" target="_blank" />
    </div>
  </article>
</template>

<script setup lang="ts">
  import { MainStore } from '@stores/MainStore'
  import CallToActionButton from "@components/CallToActionButton.vue"

  const CV_FILE = import.meta.env.VITE_ASSETS_CV_FILE
  const mainStore = MainStore()
</script>

<style scoped lang="scss">
  .about-me-section {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;

    overflow-x: hidden;

    background: $accentColor;

    width: 100vw;

    @include since-tablet-size {
      align-items: center;
      background: $primaryColor;
    }

    @include since-computer-size {
      align-items: flex-start;
    }

    header {
      @include since-computer-size {
        align-self: center;
      }

      h1 {
        background: linear-gradient(to bottom, $secondaryColorLight 10%, $accentColor 45%);
        background-clip: text;
        -webkit-background-clip: text;
        color: $accentColor;

        @include since-tablet-size {
          background: linear-gradient(to bottom, $accentColor 10%, $secondaryColorLight 45%);
          background-clip: text;
          -webkit-background-clip: text;
          color: $primaryColor;
        }

      }

      h2 {
        color: $secondaryColor;
      }
    }
  }

  .about-me-section__content {
    margin-top: 30px;

    @include since-tablet-size {
      width: $tabletWidthPercentage;
      margin-top: 50px;
    }

    @include since-computer-size {
      width: 30%;
      margin-top: 100px;
      margin-left: 40vw;
    }
  }

  .about-me-section__content-rest {
    @include since-tablet-size {
      width: $tabletWidthPercentage;
    }

    @include since-computer-size {
      width: 30%;
      margin-left: 40vw;
    }

  }

  .about-me-section__content-rest--hidden {
    display: none;
  }

  .about-me-section__show-btn {
    margin-top: 2rem;

    @include since-tablet-size {
      width: auto;
    }

    @include since-computer-size {
      margin-left: 40vw;
    }

    cursor: pointer;
    color: #6d00cc;
    font-weight: 500;
    text-decoration: underline;
    text-align: left;
  }

  .about-me-section__cta-group {
    display: flex;
    flex-flow: column nowrap;

    margin-top: 3rem;
    margin-bottom: 1rem;

    @include since-tablet-size {
      margin-top: 4rem;
      width: $tabletWidthPercentage;
    }

    @include since-computer-size {
      flex-flow: row nowrap;
      align-items: center;
      width: auto;
      margin-left: 40vw;
    }

    .open-article-btn,
    .download-cv-btn {
      text-align: center;
      font-weight: 500;
    }

    .open-article-btn {
      background: $secondaryColor;
      color: $primaryColor;
      border-color: transparent;

      @include since-computer-size {
        padding-left: 60px;
        padding-right: 60px;

        background: $accentColor;
        color: $secondaryColor;
      }
    }

    .download-cv-btn {
      margin-top: 1rem;

      border-color: $secondaryColor;
      color: $secondaryColor;

      @include since-computer-size {
        margin-top: 0;
        margin-left: 50px;

        background: $primaryColor;
        border-color: $accentColor;
      }
    }
  }
</style>