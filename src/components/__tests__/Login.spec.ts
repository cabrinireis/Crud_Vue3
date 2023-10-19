import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '@/views/LoginSusNet.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createTestingPinia } from '@pinia/testing'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('HelloWorld', () => {
  const view = mount(Login, {
    props: {},
    global: {
      plugins: [vuetify, createTestingPinia({ createSpy: vi.fn() })]
    }
  })
  test('should fail when field empty', async () => {
    const btn = view.find('[data-test="submit"]')
    view.find('#user').setValue('')
    view.find('#password').setValue('')
    await btn.trigger('submit')
    await btn.trigger('submit')
    expect(view.find('#user-messages').text()).toBe('User is required.')
    expect(view.find('#password-messages').text()).toBe('Pass is required.')
  })
})
