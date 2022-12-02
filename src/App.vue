<template>
  <NotificationPanel />
  <Nav />
  <LinkGroup />
  <HomeView />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { Link as LinkClass } from './classes/Link/Link'

  import { MainStore } from '@stores/MainStore'

  import LinkGroup from '@molecules/LinkGroup/LinkGroup.vue'
  import NotificationPanel from '@components/NotificationPanel.vue'
  import Nav from '@components/Nav/Nav.vue'
  import HomeView from '@views/Home/Home.vue'

  const mainStore = MainStore()

  onMounted(() => {
    mainStore.getLinks.forEach((link: LinkClass) => {
      const href = window.location.href;
      const hash = href.slice(href.lastIndexOf('/') + 1)
      if (link.getHref() === '/' + hash) link.setIsActive(true)
    })
  })

  window.addEventListener('resize', () => {
    mainStore.$reset();
  })
</script>

<style scoped lang="scss">
</style>