import { defineStore } from 'pinia'
import { LinkInterface as ILink } from "@model/Link/LinkInterface"
import { LinkService } from "@service/LinkService/LinkService"
import { LINK_TYPE } from '@model/Link/LINK_TYPE_ENUM'
import { LINK_SOURCE } from '@model/Link/LINK_SOURCE_ENUM'
import { computed, Ref, ref } from 'vue'

export const useStore = defineStore('Store', () => {
  const lastScrollPosY: Ref = ref(0)
  const linkService: Ref = ref(new LinkService())
  const routeLinks: Ref<Array<ILink>> = ref([])
  const embeddedLinks: Ref<Array<ILink>> = ref([])
  const socialLinks: Ref<Array<ILink>> = ref([])

  const getLinks: Ref<Array<ILink>> = computed(
    () => linkService.value.getLinks()
  )
  const getRouteLinks: Ref<Array<ILink>> = computed(
    () => routeLinks.value
  )
  const getEmbeddedLinks: Ref<Array<ILink>> = computed(
    () => embeddedLinks.value
  )
  const getSocialLinks: Ref<Array<ILink>> = computed(
    () => socialLinks.value
  )
  const getLastScrollPosY: Ref<number> = computed(
    () => lastScrollPosY.value
  )

  function setLastScrollPosY(value: number): void {
    lastScrollPosY.value = value
  }

  function _init(): void {
    routeLinks.value = linkService.value.getLinksBy({source: LINK_SOURCE.INTERNAL}).filter((link: ILink) => {
      return link.getType() === LINK_TYPE.ROUTE
    })

    const socialMediaDomains = [
      'linkedin.com',
      'youtube.com',
      'facebook.com',
      'instagram.com',
      'tiktok.com',
      'pinterest.com',
      'twitter.com',
    ]
    socialLinks.value = linkService.value.getLinksBy({source: LINK_SOURCE.EXTERNAL}).filter((link: ILink) => {
      return link.getType() === LINK_TYPE.URL && socialMediaDomains.some(sm => link.getHref().includes(sm))
    })

    embeddedLinks.value = linkService.value.getLinksBy({source: LINK_SOURCE.INTERNAL}).filter((link: ILink) => {
      return link.getType() === LINK_TYPE.FILE
    })
  }

  _init()

  return {
    // State
    linkService,
    routeLinks,
    embeddedLinks,
    socialLinks,
    // Getter
    getLinks,
    getRouteLinks,
    getEmbeddedLinks,
    getSocialLinks,
    getLastScrollPosY,
    // Actions
    setLastScrollPosY,
  }
})