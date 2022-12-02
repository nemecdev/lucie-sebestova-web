<template>
  <SvgIcon
    class="close-icon"
    :v-size="( vSize )"
    :v-color-theme="( vColorTheme )"
    :v-paths="( vPaths )"
    viewBox="0 0 45 45"
  />
</template>

<script setup lang="ts">
  import SvgIcon from "../SvgIcon.vue"

  const vPaths = [
    `
      M0 2.5
      C0 1.11929 0.839466 0 1.875 0
      H43.125
      C44.1605 0 45 1.11929 45 2.5
      C45 3.88071 44.1605 5 43.125 5
      H1.875
      C0.839467 5 0 3.88071 0 2.5
      Z
    `,
    `
      M0 22.5
      C0 21.1193 0.839466 20 1.875 20
      H43.125
      C44.1605 20 45 21.1193 45 22.5
      C45 23.8807 44.1605 25 43.125 25
      H1.875
      C0.839467 25 0 23.8807 0 22.5
      Z
    `,
    `
      M1.875 40
      C0.839466 40 0 41.1193 0 42.5
      C0 43.8807 0.839467 45 1.875 45
      H43.125
      C44.1605 45 45 43.8807 45 42.5
      C45 41.1193 44.1605 40 43.125 40
      H1.875Z
    `,
  ]

  defineProps<{
    vSize?: string,
    vColorTheme?: string
  }>()
</script>