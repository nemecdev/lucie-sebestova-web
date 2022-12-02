<template>
  <div class="route-links">
    <a v-for="link in mainStore.getLinks"
       :key="link.getName()"
       :class="{ 'link--active': link.getIsActive() }"
       :href="link.getHref()"
       @click="mainStore.navLinkClick(link)"
       class="link"
    >
      {{ link.getTxt() }}
      <div class="link__underline"></div>
    </a>
  </div>
</template>

<script setup lang="ts">
  import { MainStore } from "@stores/MainStore";
  
  const mainStore = MainStore()
</script>

<style scoped lang="scss">
  .route-links {
    order: 2;

    @include since-computer-size {
      order: 1;
    }

    .link {
      width: 100vw;
      padding: 2vh 0;
      font-weight: 500;
      font-size: 2rem;
      text-align: center;
      text-decoration: none;
      color: #b2b2b2;
    }

    .link:hover {
      color: #ffffff;
    }

    .link--active {
      color: #ffffff;

      .link__underline {
        background: #ffffff;
      }
    }

    @include since-computer-size {
      .link {
        flex-flow: row nowrap;
        width: max-content;
        padding: 0 2rem;
        font-size: 1.2rem;
        color: $secondaryColorLight;

        &:first-of-type {
          padding-left: 0;
        }

        &:hover {
          color: $secondaryColor;
        }
      }

      .link--active {
        color: $secondaryColor;
      }
    }

    .link__underline {
      margin: 0 auto;
      margin-top: 2rem;
      width: 3rem;
      height: 0.2rem;
      background: #b2b2b2;

      @include since-computer-size {
        display: none;
      }
    }

    .link:hover > .link__underline {
      background: #ffffff;
    }  
  }
</style>