import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import List from '@/views/ListPatient.vue'
import Login from '@/views/LoginSusNet.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createTestingPinia } from '@pinia/testing'
import routes from '@/router/index'
import { createRouter, createWebHashHistory } from 'vue-router'
const vuetify = createVuetify({
  components,
  directives
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('App', () => {
  let wrapper = null as any
  let router = null as any

  beforeEach(async () => {
    router = createRouter({
      history: createWebHashHistory(import.meta.env.BASE_URL),
      routes: [
        {
          path: '/list',
          name: 'list',
          component: List
        },
        {
          path: '/',
          name: 'login',
          component: Login
        }
      ]
    })

    router.push('/')
    await router.isReady()

    wrapper = mount(App, {
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
    await sessionStorage.clear()
  })

  test('should notification success', async () => {
    const el = document.createElement('body')
    document.body.appendChild(el)
    expect(document.querySelector('.v-snackbar__content')?.innerHTML).toBe('Seja bem vindo(a).')
  })

  test('routing with authentication', async () => {
    const push = vi.spyOn(router, 'push')
    await router.push('/list')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/list')
    expect(wrapper.findComponent(List).exists()).toBe(true)
  })

  test('routing not authentication', async () => {
    routes.push('/list')
    await routes.isReady()
    expect(wrapper.findComponent(List).exists()).toBe(false)
  })
})
