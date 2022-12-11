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

<style scoped lang="less">
</style>