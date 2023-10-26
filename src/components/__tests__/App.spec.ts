import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'
const vuetify = createVuetify({
  components,
  directives
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should notification success', async () => {
    const el = document.createElement('body')
    document.body.appendChild(el)

    mount(App, {
      props: {},
      global: {
        plugins: [
          vuetify,
          router,
          createTestingPinia({
            initialState: {
              sus: {
                notification: {
                  type: 'error',
                  active: true,
                  text: 'Seja bem vindo(a).'
                }
              }
            },
            createSpy: vi.fn
          })
        ]
      }
    })
    expect(document.querySelector('.v-snackbar__content')?.innerHTML).toBe('Seja bem vindo(a).')
  })
})
