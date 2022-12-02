// obtain plugin
var cc = initCookieConsent();

window.addEventListener('click', (e) => {
  if (e.target.className === 'cc-link' && e.target?.href?.includes('#contact')) cc.hideSettings();
})

// run plugin with your configuration
cc.run({
  current_lang: 'en',
  autoclear_cookies: true,                   // default: false
  page_scripts: true,                        // default: false

  // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
  // delay: 0,                               // default: 0
  auto_language: 'browser',                     // default: null; could also be 'browser' or 'document'
  // autorun: true,                          // default: true
  // force_consent: false,                   // default: false
  // hide_from_bots: true,                   // default: true
  // remove_cookie_tables: false             // default: false
  // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
  // cookie_expiration: 182,                 // default: 182 (days)
  // cookie_necessary_only_expiration: 182   // default: disabled
  // cookie_domain: location.hostname,       // default: current domain
  // cookie_path: '/',                       // default: root
  // cookie_same_site: 'Lax',                // default: 'Lax'
  // use_rfc_cookie: false,                  // default: false
  // revision: 0,                            // default: 0

  onFirstAction: function (user_preferences, cookie) {
    // callback triggered only once
  },

  onAccept: function (cookie) {
    // ...
  },

  onChange: function (cookie, changed_preferences) {
    // ...
  },

  languages: {
    'en': {
      consent_modal: {
        title: 'We use cookies!',
        description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
        primary_btn: {
          text: 'Accept all',
          role: 'accept_all'              // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Reject all',
          role: 'accept_necessary'        // 'settings' or 'accept_necessary'
        }
      },
      settings_modal: {
        title: 'Cookie preferences',
        save_settings_btn: 'Save settings',
        accept_all_btn: 'Accept all',
        reject_all_btn: 'Reject all',
        close_btn_label: 'Close',
        cookie_table_headers: [
          { col1: 'Name' },
          { col2: 'Domain' },
          { col3: 'Expiration' },
          { col4: 'Description' }
        ],
        blocks: [
          {
            title: 'Cookie usage 📢',
            description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
          }, {
            title: 'Strictly necessary cookies',
            description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
            }
          }, {
            title: 'Performance and Analytics cookies',
            description: 'These cookies allow the website to remember the choices you have made in the past',
            toggle: {
              value: 'analytics',     // your cookie category
              enabled: false,
              readonly: false
            },
            cookie_table: [             // list of all expected cookies
              {
                col1: '^_ga',       // match all cookies starting with "_ga"
                col2: 'google.com',
                col3: '2 years',
                col4: 'description ...',
                is_regex: true
              },
              {
                col1: '_gid',
                col2: 'google.com',
                col3: '1 day',
                col4: 'description ...',
              }
            ]
          }, {
            title: 'Advertisement and Targeting cookies',
            description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false
            }
          }, {
            title: 'More information',
            description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
          }
        ]
      }
    },
    'cs': {
      consent_modal: {
        title: 'Používám cookies!',
        description: 'Ahoj, tato webová stránka používá základní cookies pro ujištění správného fungování a ke sledování cookies pro pochopení jak se na stránce pohybuješ. Analytické cookies budou použity pouze v případě, kdy je povolíš. <button type="button" data-cc="c-settings" class="cc-link">Zvolit možnosti</button>',
        primary_btn: {
          text: 'Příjmout vše',
          role: 'accept_all'              // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Odmítnout vše',
          role: 'accept_necessary'        // 'settings' or 'accept_necessary'
        }
      },
      settings_modal: {
        title: 'Cookie preference',
        save_settings_btn: 'Uložit nastavení',
        accept_all_btn: 'Příjmout vše',
        reject_all_btn: 'Odmítnout vše',
        close_btn_label: 'Zavřít',
        cookie_table_headers: [
          { col1: 'Name' },
          { col2: 'Domain' },
          { col3: 'Expiration' },
          { col4: 'Description' }
        ],
        blocks: [
          {
            title: 'Cookie použítí 📢',
            description: 'Používám cookies k ujištění základní funkčnosti webu a zlepšení uživatelské přívětivosti. Pro každou kategorii si můžete kdykoli zvolit možnost povolení/zakázání. Pro více informací souvisejících s cookies a o citlivých údajích si můžete přečíst celý článek <a href="#" class="cc-link">privacy policy</a>.'
          }, {
            title: 'Nezbytné cookies',
            description: 'Cookies které jsou nezbytné pro správné fungování stránky. Bez těchto nemusí webová stránka správně fungovat',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
            }
          }, {
            title: 'Výkonnostní a Analytické cookies',
            description: 'Tyto si budou pamatovat Vaše předchozí volby na stránce',
            toggle: {
              value: 'analytics',     // your cookie category
              enabled: false,
              readonly: false
            },
            cookie_table: [             // list of all expected cookies
              {
                col1: '^_ga',       // match all cookies starting with "_ga"
                col2: 'google.com',
                col3: '2 years',
                col4: 'Pro správné fungování nástroje google analytics',
                is_regex: true
              },
              {
                col1: '_gid',
                col2: 'google.com',
                col3: '1 day',
                col4: 'Pro správné fungování nástroje google analytics',
              }
            ]
          }, {
            title: 'Reklamní a Cílené cookies',
            description: 'Tyto cookies shromažďují informace o tom jak stránku používáte, který odkaz jste navštívily a které stránky jste navštívily. Všechna tato data jsou anonymizována a nelze Vás podle nich identifikovat.',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false
            }
          }, {
            title: 'Více informací',
            description: 'Pro jakékoli dotazy související s politikou používání cookies a Vašich voleb, prosím <a class="cc-link" data-scroll href="#contact">Kontaktujte mě</a>.',
          }
        ]
      }
    }
  }
});