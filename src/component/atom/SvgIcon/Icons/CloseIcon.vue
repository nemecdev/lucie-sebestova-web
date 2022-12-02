<template>
  <SvgIcon
    class="close-icon"
    :v-size="( vSize )"
    :v-color-theme="( vColorTheme )"
    :v-paths="( vPaths )"
    viewBox="0 0 50 50"
  />
</template>

<script setup lang="ts">
  import SvgIcon from "../SvgIcon.vue"

  defineProps<{
    vSize?: string,
    vColorTheme?: string
  }>()

  const vPaths = [
    `
      M2.70459e-05 6.93665
      L6.93668 0
      L25.0003 18.0636
      L43.0633 0.000682286
      L49.9999 6.93734
      L31.937 25.0003
      L50 43.0633
      L43.0633 49.9999
      L25.0003 31.9369
      L6.93665 50.0006
      L0 43.064
      L18.0637 25.0003
      L2.70459e-05 6.93665Z
    `,
  ]
</script>