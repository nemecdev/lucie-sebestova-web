<template>
  <div class="link-group">
    <slot>
      <Link v-for="(link, id) in vLinks"
            :key="id"
            :href="link.getHref()"
            :rel="link.getRel()"
            :target="link.getTarget()"
            :class="( vLinkClass )"
      >
        {{ link.getLabel() }}
      </Link>
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { ILink, Link as CLink } from "@atom/Link/Link"
  import Link from "@atom/Link/Link.vue"

  defineProps<{
    vLinks?: Array<ILink>,
    vLinkClass?: string
  }>()
</script>

<style scoped lang="less">
  @import './LinkGroup.less';
</style>