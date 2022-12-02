<template>
  <div class="page-home">
    <Nav
      :v-route-links="( vNavRouteLinks )"
      :v-embedded-links="( vNavEmbeddedLinks )"
      :v-social-links="( vNavSocialLinks )"
      :v-heading-txt="( vNavHeadingTxt )"
      @nav:toggle="( onNavToggle )"
    />
    <ScrollTopButton />
    <div
      id="home"
      class="page-home__content-wrapper"
      :class="{ 'page-home__content-wrapper--hidden': isNavOpen }"
    >
      <Header
        :v-hero-heading="( vHeaderHeroHeading )"
        :v-hero-heading-sub="( vHeaderHeroHeadingSub )"
        :v-hero-cta-txt="( vHeaderHeroCtaTxt )"
        :v-hero-cta-href="( vHeaderHeroCtaHref )"
      />
      <main>
        <Flex vDirection="column">
          <Flex
            id="about-me"
            class="page-home__section page-home__section-about-me"
            vDirection="column"
          >
            <SectionHeading
              :v-heading-txt="( vAboutMeHeadingTxt )"
            />
            <Flex
              vDirection="column"
              class="page-home__section-content section-about-me__content"
            >
              <Img
                :src="( vAboutMeImgSrc )"
                :alt="( vAboutMeImgAlt )"
                :width="( vAboutMeImgWidth )"
                :height="( vAboutMeImgHeight )"
              />
              <slot name="sectionAboutMe"></slot>
            </Flex>
          </Flex>
          <Flex
            id="portfolio"
            class="page-home__section page-home__section-portfolio"
            vDirection="column"
          >
            <SectionHeading
              :v-heading-txt="( vPortfolioHeadingTxt )"
            />
            <Flex class="page-home__section-content section-portfolio__content">
              <Portfolio />
            </Flex>
            <slot name="sectionPortfolio"></slot>
          </Flex>
          <Flex
            id="contact"
            vDirection="column"
            class="page-home__section page-home__section-contact"
          >
            <SectionHeading
              vTheme="dark"
              :v-heading-txt="( vContactHeadingTxt )"
            />
            <Paragraph vTheme="dark">
              <slot name="sectionContact"></slot>
            </Paragraph>
            <Heading
              class="contact-form__heading"
              vTheme="dark"
              :v-tag="( HEADING_TYPE.H3 )"
              :v-content="( 'Kontaktní formulář' )"
            />
            <ContactForm
              :v-agreement-txt="( vContactFormAgreementTxt )"
              :v-trigger-reset-form="( vContactFormTriggerReset )"
              vTheme="dark"
              @submit:contact-form="( handleContactFormSubmit )"
            />
          </Flex>
        </Flex>
      </main>
      <Footer
        :v-txt="( vFooterTxt )"
        :v-web-link-txt="( vFooterWebLinkTxt )"
        :v-web-link-href="( vFooterWebLinkHref )"
        :v-mail-link-txt="( vFooterMailLinkTxt )"
        :v-mail-link-href="( vFooterMailLinkHref )"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeUpdate, onUpdated } from "vue"
  import { useStore } from "@store/Store"

  import { LinkInterface as ILink } from "@atom/Link/LinkInterface"
  import { ContactFormDataInterface as IFormData } from "@organism/ContactForm/ContactFormDataInterface"
  import { HEADING_TYPE } from "@atom/Heading/HEADING_TYPE_ENUM"

  import Flex from "@atom/Flex/Flex.vue"
  import Img from "@atom/Img/Img.vue"
  import Paragraph from "@atom/Paragraph/Paragraph.vue"
  import Heading from "@atom/Heading/Heading.vue"

  import SectionHeading from "@molecule/SectionHeading/SectionHeading.vue"
  import ScrollTopButton from "@molecule/ScrollTopButton/ScrollTopButton.vue"

  import Nav from "@organism/Nav/Nav.vue"
  import Header from "@organism/Header/Header.vue"
  import ContactForm from "@organism/ContactForm/ContactForm.vue"
  import Footer from "@organism/Footer/Footer.vue"
  import Portfolio from "@organism/Portfolio/Portfolio.vue"

  defineProps<{
    vNavRouteLinks: Array<ILink>,
    vNavEmbeddedLinks: Array<ILink>,
    vNavSocialLinks: Array<ILink>,
    vNavHeadingTxt?: string,

    vHeaderHeroHeading: string,
    vHeaderHeroHeadingSub: string,
    vHeaderHeroCtaTxt: string,
    vHeaderHeroCtaHref: string,

    vAboutMeImgSrc?: string,
    vAboutMeImgAlt?: string,
    vAboutMeImgWidth?: string,
    vAboutMeImgHeight?: string,

    vAboutMeHeadingTxt: string,
    vPortfolioHeadingTxt: string,
    vContactHeadingTxt: string,
    vContactFormAgreementTxt: string,
    vContactFormTriggerReset?: boolean,

    vFooterTxt: string,
    vFooterWebLinkTxt: string,
    vFooterWebLinkHref: string,
    vFooterMailLinkTxt: string,
    vFooterMailLinkHref: string,
  }>()

  const emit = defineEmits<{
    (e: 'submit:contactForm', data: IFormData): void
  }>()

  onBeforeUpdate(() => {
    // Nav emits and code below stores
    // window.scrollY before this component is updated
    if (isNavOpen.value) {
      store.setLastScrollPosY(window.scrollY)
    }
  })

  onUpdated(() => {
    if (!isNavOpen.value) {
      window.scrollTo(0, store.getLastScrollPosY)
    }
  })

  // Do Not Touch store until u know what you're doing
  // Use Page as source of truth for data instead
  const store = useStore()

  const onNavToggle = (visibility: boolean) => {
    isNavOpen.value = visibility
  }

  const handleContactFormSubmit = (formData: IFormData) => {
    emit('submit:contactForm', formData)
  }

  let isNavOpen = ref(false)
</script>

<style scoped lang="less">
  @import "./Home.less";
</style>