<template>
  <IconButton
    class="scroll-top-button"
    :class="{
      'scroll-top-button--hidden': !isVisible
    }"
    data-scroll="0"
    vFill
    vBorderRadius
  >
    <template #svgIcon>
      <UpArrowIcon :v-size="( vSize )" />
    </template>
  </IconButton>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue"

  import IconButton from "@atom/IconButton/IconButton.vue"
  import UpArrowIcon from "@atom/SvgIcon/Icons/UpArrowIcon.vue"

  withDefaults(defineProps<{
    vSize?: string,
  }>(), {
    vSize: 'small'
  })

  onMounted(() => {
    window.addEventListener('scroll', handleButtonVisibility)
    window.addEventListener('touchmove', handleButtonVisibility)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleButtonVisibility)
    window.removeEventListener('touchmove', handleButtonVisibility)
  })

  const handleButtonVisibility = () => {
    if (window.scrollY > 300) isVisible.value = true
    if (window.scrollY < 300) isVisible.value = false
  }

  let isVisible = ref(false)
</script>

<style scoped lang="less">
  @import "./ScrollTopButton.less";
</style>