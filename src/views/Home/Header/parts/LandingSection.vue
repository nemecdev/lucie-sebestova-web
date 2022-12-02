<template>
  <div class="landing-part">
    <span class="landing-part__title">
      Lucie Šebestová
    </span>
    <span class="landing-part__description">
      Grafička a Designerka
    </span>
    <CallToActionButton class="link landing-part__cta-btn" link-href="#portfolio" inner-txt="Ukázky prací" :click-call="onClick('portfolio')" />
    <img class="landing-part__img" src="/img/landing/lucie.png"/>
  </div>
</template>

<script setup lang="ts">
  import { MainStore } from "@stores/MainStore"

  import CallToActionButton from "@components/CallToActionButton.vue"

  const mainStore = MainStore()
  const onClick = (linkName: string) => {
    const link = mainStore.getLinkByName(linkName)
    if (!link) return

    return () => {
      mainStore.navLinkClick(link)
    }
  }
</script>

<style scoped lang="scss">
  .landing-part {
    height: $headerHeight;
    max-height: $headerHeight;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    overflow-x: hidden;

    @include since-tablet-size {
      flex-flow: column wrap;
      align-items: flex-end;
    }

    @include since-computer-size {
      height: 600px;
      max-height: initial;
    }
  }

  .landing-part__title {
    font-family: "BlackSignature";
    color: $accentColor;
    font-size: 3.2rem;
    text-align: center;

    @include since-tablet-size {
      margin: 0 10vw;
    }

    @include since-computer-size {
      font-size: 5rem;
    }
  }

  .landing-part__description {
    color: $primaryColor;
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;

    @include since-tablet-size {
      margin: 0 10vw;
    }

    @include since-computer-size {
      font-size: 3rem;
    }
  }

  .landing-part__cta-btn {
    margin-top: 2rem;

    @include since-tablet-size {
      margin-right: 10vw;
      margin-left: 10vw;
    }

    @include since-computer-size {
      font-size: 1.5rem;
    }
  }

  .landing-part__img {
    height: $headerHeight;
    max-height: $headerHeight;

    display: none;
    background: $accentColor;

    @include since-tablet-size {
      display: block;

      padding: 80px 0 0 10vw;
    }

    @include since-computer-size {
      height: 600px;
      max-height: initial;

      padding: 100px 0 0 15vw;
    }
  }
</style>