import { render, screen } from '@testing-library/vue'
import List from '@/views/ListPatient.vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createTestingPinia } from '@pinia/testing'
import { susStore } from '@/stores/index'
import { makeServer } from '@/mirage'
const vuetify = createVuetify({
  components,
  directives
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('List', () => {
  let store = null as any
  let server = null as any
  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    server.createList('patient', 3)
    render(List, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            stubActions: false
            // createSpy: vi.fn()
          })
        ]
      }
    })
    store = susStore()
  })
  afterEach(() => {
    server.shutdown()
  })
  test('Should render List', async () => {
    const storeMock = {
      storeAct: () => store.getPatients()
    }
    const getSpy = vi.spyOn(storeMock, 'storeAct')
    await storeMock.storeAct()
    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(screen).toBeDefined()
    expect(screen.getByText('Cadastrar'))
    expect(screen.getAllByTestId('row-table')).toHaveLength(3)
  })
})
