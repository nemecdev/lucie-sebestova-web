<template>
  <div class="page-home">
    <Home
      :v-hero-title="( 'Lucie Šebestová' )"
      :v-hero-title-sub="( 'Grafička a Designerka' )"
      :v-hero-call-to-action-label="( 'Ukázky prací' )"
      :v-hero-call-to-action-href="( '/#portfolio' )"
      :v-img-src="( '/img/landing/lucie.png' )"
      :v-img-alt="( 'Úvodní foto Lucie Šebestové' )"
    />
  </div>
</template>

<script setup lang="ts">
  import Home from "@template/Home/Home.vue"
</script>

<style lang="less">
  @import './Home.less';
</style>