<template>
  <div class="social-links">
    <LinkLinkedIn href="https://cz.linkedin.com/in/lucie-%C5%A1ebestov%C3%A1-a19b644b" />
  </div>
</template>

<script setup lang="ts">
  import LinkLinkedIn from '@components/LinkLinkedIn.vue';
</script>

<style lang="scss">
  .social-links {
    order: 1;
    width: auto;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    
    .link-linked-in {
      width: 4rem;
    }
    
    @include since-computer-size {
      order: 3;

      .link-linked-in {
        max-width: 33px;
        max-height: 33px;
      }
    }
  }
</style>