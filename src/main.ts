import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SweetScroll from 'sweet-scroll'
import App from './App.vue'

import CookieConsentInitUrl from './cookieconsent-init.js?url'
import CookieConsentUrl from '../node_modules/vanilla-cookieconsent/dist/cookieconsent.js?url'
import CookieConsentCssUrl from '../node_modules/vanilla-cookieconsent/dist/cookieconsent.css?url'

const cCssEl = document.getElementById('cookieconsent-css') as HTMLLinkElement

if (cCssEl) cCssEl.href = CookieConsentCssUrl
const scriptEl = () => document.createElement('script')

// #TODO - fix cookie consent
document.addEventListener('DOMContentLoaded', () => {
  const sweetScroll = new SweetScroll({
    easing: 'easeInOutSine'
  })
  
  const consentScript = scriptEl()
  consentScript.src = CookieConsentUrl
  document.body.appendChild(consentScript)

  const consentInitScript = scriptEl()
  consentInitScript.src = CookieConsentInitUrl
  document.body.appendChild(consentInitScript)
}, false)

createApp(App)
  .use(createPinia())
  .mount('#app')

  