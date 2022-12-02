<template>
  <a class="cta-btn"
     :href="linkHref"
     :target="target"
     @click="onClick"
  >
    {{ innerTxt }}
  </a>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    clickCall?: CallableFunction
    linkHref?: string,
    innerTxt?: string,
    target?: string,
  }>(), {
    clickCall: () => {},
    linkHref: '',
    innerTxt: 'Action',
    target: '_self'
  })

  const onClick = (event: Event) => {
    if ( props.linkHref === '' ) event.preventDefault()
    props.clickCall()
  }
</script>

<style lang="scss">
  $accentColor: #444444 !default;
  $primaryColor: #ffffff !default;

  .cta-btn {
    padding: 0.5rem 1.5rem;

    border: 0.1rem solid $accentColor;
    border-radius: $borderRadius;

    color: $accentColor;
    font-size: 1.2rem;
    text-decoration: none;

    &:hover {
      color: $primaryColor;
      border-color: $primaryColor;
    }
  }
</style>