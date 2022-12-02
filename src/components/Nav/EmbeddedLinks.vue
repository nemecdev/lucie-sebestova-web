<template>
  <div class="embedded-links">
    <a class="link link-download-cv"
       :href="CV_FILE"
       download
    >
      Stáhnout CV
    </a>
  </div>
</template>

<script setup lang="ts">
  const CV_FILE = import.meta.env.VITE_ASSETS_CV_FILE
</script>

<style scoped lang="scss">
  $borderWidth: 1px !default;

  .embedded-links {
    order: 3;
    width: 100vw;
    padding: 2vh 0;
    font-weight: 500;
    font-size: 2rem;

    @include since-computer-size {
      padding: 0;
      order: 2;
      justify-content: flex-end;
      font-size: 1rem;
    }

    .link-download-cv {
      text-align: center;
      color: $accentColor;
      text-decoration: none;

      @include since-computer-size {
        padding: 0.3rem;
        border: $borderWidth solid #b18937;
        border-radius: $borderRadius;

        color: #b18937;
      }

      &:hover {
        color: #cbb588;
        border-color: #cbb588;
      }
    }
  }
</style>