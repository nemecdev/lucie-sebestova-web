<template>
  <Flex class="footer"
        vDirection="row"
        vJustify="center"
        vAlignItems="center"
        vWrap
  >
    <Paragraph class="footer__content">
      <span class="footer__content-txt">{{ vTxt }}</span>
      <Link class="footer__content-link"
            :v-content="( vWebLinkTxt )"
            :href="( vWebLinkHref )"
            :v-decoration="false"
            target="_blank"
            vTheme="dark"
      />
      <span>|</span>
      <Link class="footer__content-link"
            :v-content="( vMailLinkTxt )"
            :href="( 'mailto: ' + vMailLinkHref )"
            :v-decoration="false"
            target="_blank"
            vTheme="dark"
      />
    </Paragraph>
  </Flex>
</template>

<script setup lang="ts">
  import Flex from "@atom/Flex/Flex.vue"
  import Link from "@atom/Link/Link.vue"
  import Paragraph from "@atom/Paragraph/Paragraph.vue"

  defineProps<{
    vTxt: string,
    vWebLinkTxt: string,
    vWebLinkHref: string,
    vMailLinkTxt: string,
    vMailLinkHref: string,
  }>()
</script>

<style scoped lang="less">
  @import "./Footer.less";
</style>