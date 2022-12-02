<template>
  <SvgIcon
    class="close-icon"
    :v-size="( vSize )"
    :v-color-theme="( vColorTheme )"
    :v-paths="( vPaths )"
    viewBox="0 0 50 32"
  />
</template>

<script setup lang="ts">
  import SvgIcon from "../SvgIcon.vue"

  const vPaths = [
    `
      M50 24.9996
      L43.0633 31.9363
      L25.0003 13.8733
      L6.93665 31.937
      L0 25.0003
      L25.0003 0
      L50 24.9996
      Z
    `,
  ]

  defineProps<{
    vSize?: string,
    vColorTheme?: string
  }>()
</script>