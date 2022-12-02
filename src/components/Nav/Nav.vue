<template>
  <ToggleBtn />
  <nav class="nav" :class="{ 'nav--hidden': !mainStore.getIsVisible('nav') }">
    <RouteLinks class="nav__group" />
    <EmbeddedLinks class="nav__group" />
    <SocialLinks class="nav__group" />
  </nav>
</template>

<script setup lang="ts">
  import { MainStore } from "@stores/MainStore";

  import ToggleBtn from "./ToggleBtn.vue"
  import RouteLinks from "./RouteLinks.vue"
  import EmbeddedLinks from "./EmbeddedLinks.vue"
  import SocialLinks from "./SocialLinks.vue"

  const mainStore = MainStore()
</script>

<style lang="scss">
  .nav {
    z-index: 2;

    width: 100vw;
    height: 100vh;
    padding: 5vh 0;
    position: fixed;
    top: 0;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    overflow-y: auto;
    background: $secondaryColor;

    @include since-computer-size {
      position: sticky;
      height: auto;
      padding: 15px 10vw;

      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;

      overflow-x: hidden;
      background: $primaryColor;
    }
  }

  .nav__group {
    display: flex;
    flex-flow: column nowrap;

    margin: 2vh 0;

    @include since-computer-size {
      margin: 0;
      padding: 0;

      flex-flow: row nowrap;
    }
  }

  @include since-computer-size {
    .social-links {
      margin-left: 30px;
    }
  }

  .nav--hidden {
    display: none;

    @include since-computer-size {
      display: flex;
    }
  }
</style>