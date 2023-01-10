import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SweetScroll from 'sweet-scroll'
import App from './App.vue'

import CookieConsentInitUrl from './cookieconsent-init.js?url'
import CookieConsentUrl from '../node_modules/vanilla-cookieconsent/dist/cookieconsent.js?url'
import CookieConsentCssUrl from '../node_modules/vanilla-cookieconsent/dist/cookieconsent.css?url'

document.addEventListener('DOMContentLoaded', () => {
  const sweetScroll = new SweetScroll({
    easing: 'easeInOutSine'
  })
}, false)

createApp(App)
  .use(createPinia())
  .mount('#app')


// #TODO - Find better way to import js libs which are not modules
const cCssEl: HTMLLinkElement | null = document.getElementById('cookieconsent-css') as HTMLLinkElement
if (cCssEl) cCssEl.href = CookieConsentCssUrl

const scriptEl = (id: string, scriptUrl: string): HTMLScriptElement => {
  const el = document.createElement('script')
  el.src = scriptUrl
  el.id = id

  return el
}

document.body.appendChild(scriptEl('cookieconsent', CookieConsentUrl))
const el = document.getElementById('cookieconsent')
if (el) {
  el.onload = () => {
    document.body.appendChild(scriptEl('cookieconsent-init', CookieConsentInitUrl))
  }
}