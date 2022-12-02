import { ConfigProvider } from "@cls/Provider/ConfigProvider"
import { defineStore } from 'pinia'
import { Link } from "@atoms/Link/model/Link"

interface Visibility {
  [key: string]: boolean
}

const config = new ConfigProvider().getConfig()
let notifTimeoutID: number = 0;

export const MainStore = defineStore('MainStore', {
  state: () => ({
    links: config?.links as Array<Link>,
    scrollPosY: 0 as number,
    lastVisitedLink: {} as Link,
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
      return (label: string): Link | undefined => {
        return state.links.find( l => l.getLabel() === label )
      }
    },

    getLinks: (state) => {
      return state.links
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

    navLinkClick: function (link: Link) {
      this.lastVisitedLink = link
      this.deactivateLinks()

      link.setIsActive(true)

      this.hide('nav')
      this.hide('about-me-article')
    },

    deactivateLinks(): void {
      this.links.forEach((link: Link) => { link.setIsActive(false) })
    },

    pushNotification(notification: string): void {
      clearTimeout(notifTimeoutID)
      this.notification = notification
      this.unhide('notification-panel')
      notifTimeoutID = setTimeout(() => {
        this.notification = ''
        clearTimeout(notifTimeoutID)
        this.hide('notification-panel')
      }, 5000)
    }
  }
})