<template>
  <div class="link-group">
    <Link v-for="(link, id) in links"
          :key="id"
          :href="link.href"
    >
      {{ link.label }}
    </Link>
  </div>
</template>

<script setup lang="ts">
  import { inject } from "vue"
  import { ILink } from "@atoms/Link/ILink"
  import Link from "@atoms/Link/Link.vue"

  const links: Array<ILink> | undefined = inject('Links')
</script>

<style scoped lang="less">
  @import './LinkGroup.less';
</style>