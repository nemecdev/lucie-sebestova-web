<template>
  <div
    class="nav"
    :class="{ 'nav--fixed': isNavTopFixed }"
  >
    <HorizontalNav
      :v-route-links="( vRouteLinks )"
      :v-embedded-links="( vEmbeddedLinks )"
      :v-social-links="( vSocialLinks )"
      :v-theme="( !isNavTopFixed ? 'dark' : '' )"
    />
    <VerticalNav
      :v-route-links="( vRouteLinks )"
      :v-embedded-links="( vEmbeddedLinks )"
      :v-social-links="( vSocialLinks )"
      :v-heading-txt="( vHeadingTxt )"
      @visibility:toggle="( handleVerticalNavToggle )"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue"
  import { LinkInterface as ILink } from "@atom/Link/LinkInterface"

  import HorizontalNav from "@molecule/HorizontalNav/HorizontalNav.vue"
  import VerticalNav from "@molecule/VerticalNav/VerticalNav.vue"

  defineProps<{
    vRouteLinks: Array<ILink>,
    vEmbeddedLinks: Array<ILink>,
    vSocialLinks: Array<ILink>,
    vHeadingTxt?: string,
  }>()

  const emit = defineEmits<{
    (e: "nav:toggle", visibility: boolean): void
  }>()

  onMounted(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) isNavTopFixed.value = true
      if (window.scrollY < 5) isNavTopFixed.value = false
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', () => {})
  })

  const handleVerticalNavToggle = (visibility: boolean) => {
    isVisible.value = visibility
    emit("nav:toggle", isVisible.value)
  }

  let isNavTopFixed = ref(false)
  let isVisible = ref(false)
</script>

<style scoped lang="less">
  @import "./Nav.less";
</style>