import { defineStore } from 'pinia'
import { ILink, ILinkData } from "@atom/Link/Link"
import { LinkService, LINK_TYPE } from "@atom/Link/LinkService"
import Config from "@/config.json"

interface Visibility {
  [key: string]: boolean
}

const confLinks: Array<ILinkData> = Config.links
const linkService = new LinkService()

linkService.buildLinks(confLinks)

let notifTimeoutID: number = 0;

export const useStore = defineStore('Store', {
  state: () => ({
    linkService: linkService,
    scrollPosY: 0 as number,
    lastVisitedLink: {} as ILink,
    notification: '' as string,
    visibility: {
      'notification-panel': false,
      'nav': false,
      'about-me-article': false,
      'about-me-section__content-rest': false,
    } as Visibility,
  }),
  getters: {
    getIsVisible: (state) => {
      return (key?: string): boolean => {
        if (key) return Object.hasOwn(state.visibility, key) ? state.visibility[key] : false
        return Object.values(state.visibility).some((v) => v === true)
      }
    },

    getScrollPosY: (state) => {
      return state.scrollPosY
    },

    getLinkByLabel: (state) => {
      return ((label: string) => state.linkService.getLinkByLabel(label))
    },

    getLinks: (state) => {
      return state.linkService.getLinks()
    },

    getInternalLinks: (state) => {
      return state.linkService.getLinks(LINK_TYPE.INTERNAL)
    },

    getExternalLinks: (state) => {
      return state.linkService.getLinks(LINK_TYPE.EXTERNAL)
    },

    getSocialLinks: (state) => {
      return state.linkService.getLinks(LINK_TYPE.SOCIAL)
    },

    getNotification: (state) => {
      return state.notification
    }
  },
  actions: {
    unhide: function (key: string) {
      this.visibility[key] = true
    },

    hide: function (key: string) {
      this.visibility[key] = false
    },

    setScrollPosY: function (value: number) {
      this.scrollPosY = value
    },

    toggleVisibility: function (key: string) {
      this.visibility[key] = !this.visibility[key]
    },

    navLinkClick: function (link: ILink) {
      this.lastVisitedLink = link
      this.deactivateLinks()

      link.setIsActive(true)

      this.hide('nav')
      this.hide('about-me-article')
    },

    deactivateLinks(): void {
      this.linkService.deactivateLinks()
    },

    pushNotification(notification: string): void {
      clearTimeout(notifTimeoutID)
      this.notification = notification
      this.unhide('notification-panel')
      notifTimeoutID = window.setTimeout(() => {
        this.notification = ''
        clearTimeout(notifTimeoutID)
        this.hide('notification-panel')
      }, 5000)
    }
  }
})