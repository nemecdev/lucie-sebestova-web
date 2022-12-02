<template>
  <HomeTemplate
    :v-nav-route-links="( store.getRouteLinks )"
    :v-nav-embedded-links="( store.getEmbeddedLinks )"
    :v-nav-social-links="( store.getSocialLinks )"
    :v-nav-heading-txt="( 'Lucie Šebestová' )"

    :v-header-hero-heading="( 'Lucie Šebestová' )"
    :v-header-hero-heading-sub="( 'Grafička a Designerka' )"
    :v-header-hero-cta-txt="( 'Ukázky prací' )"
    :v-header-hero-cta-href="( '#portfolio' )"

    :v-about-me-heading-txt="( 'O mně' )"
    :v-about-me-img-src="( '/img/landing/lucie.png' )"

    :v-portfolio-heading-txt="( 'Portfolio' )"

    :v-contact-heading-txt="( 'Kontakt' )"
    :v-contact-form-agreement-txt="( 'Souhlasím se zpracováním osobních údajů za účelem komunikace.' )"
    :v-contact-form-trigger-reset="( triggerFormReset )"

    :v-footer-txt="( 'Tento web vytvořil - ' )"
    :v-footer-web-link-txt="( 'nemecdev' )"
    :v-footer-web-link-href="( 'https://nemecdev.tech' )"
    :v-footer-mail-link-txt="( 'nemec.karel.r93@gmail.com' )"
    :v-footer-mail-link-href="( 'nemec.karel.r93@gmail.com' )"

    @submit:contact-form="( handleContactFormSubmit )"
  >
    <template #sectionAboutMe>
      <Flex
        vWrap
        vAlignItems="flex-start"
        vDirection="row"
        class="about-me-content"
      >
        <BoxContext>
          <Paragraph class="paragraph-about-me">
            <b>J</b>sem kreativní grafička s více než pětiletou zkušeností v oblasti
            předtiskové přípravy a se znalostmi přesahující do oblastí e-commerce a správy sociálních sítí
          </Paragraph>
        </BoxContext>
        <BoxContext class="box-context--light">
          <Paragraph class="paragraph-about-me">
            <b>R</b>áda v poslední době zlepšuji své schopnosti v oblastech grafiky
            pro online prostředí, copywritingu, sociálních sítích a online marketingu
          </Paragraph>
        </BoxContext>
        <BoxContext class="box-context--light">
          <Paragraph class="paragraph-about-me">
            <b>D</b>říve jsem pracovala v copycentru, kde jsem prakticky využila svého vzdělání.
            Vypracovala jsem se až na post vedoucí prodejny v Brně.
          </Paragraph>
        </BoxContext>
        <BoxContext>
          <Paragraph class="paragraph-about-me">
            <b>P</b>o práci v copycentru přišla výzva vytvořit e-shop pro prodej textilních produktů.
            Přišla jsem při té příležitosti do styku se základy marketingu a řešení eshopu postaveném na shoptetu.
          </Paragraph>
        </BoxContext>
      </Flex>
    </template>
    <template #sectionContact>
      <Paragraph class="paragraph-contact">
        Můžete mě kontaktovat prostřednictvím emailu
      </Paragraph>
      <Link
        :v-content="( 'lucielsebestova@gmail.com' )"
        :href="( 'mailto: lucielsebestova@gmail.com' )"
        :v-decoration="( false )"
        :v-theme="( 'dark' )"
      />
      <Paragraph>
        <b>nebo použíjte</b>
      </Paragraph>
    </template>
  </HomeTemplate>
</template>

<script setup lang="ts">
  import { ref, onUpdated } from "vue"
  import axios, { AxiosResponse } from "axios"

  import { useStore } from "@store/Store"

  import { ContactFormDataInterface as IFormData } from "@organism/ContactForm/ContactFormDataInterface"

  import Paragraph from "@atom/Paragraph/Paragraph.vue"
  import Link from "@atom/Link/Link.vue"

  import BoxContext from "@molecule/BoxContext/BoxContext.vue"

  import HomeTemplate from "@template/Home/Home.vue"
import Flex from "@atom/Flex/Flex.vue"

  const store = useStore()

  onUpdated(() => {
    triggerFormReset.value = false
  })

  const sendContactEmail = async (data: IFormData) => {
    return await axios({
      method: 'post',
      url: import.meta.env.VITE_API_ENDPOINT_SEND_MAIL as string,
      data: {
        email: data.email,
        subject: data.subject,
        message: data.message,
        agreement: data.agreement
      }
    })
  }

  const handleContactFormSubmit = (data: IFormData) => {
    sendContactEmail(data).then((response: AxiosResponse) => {
      let responseData: { message: string, errors: Array<string> } = response.data
      if (responseData.errors.length === 0) triggerFormReset.value = true
    }).catch((error) => {
      console.error(error)
    })

    console.log(data)
  }

  let triggerFormReset = ref(false)
</script>

<style scoped lang="less">
  @import "./Home.less";
</style>