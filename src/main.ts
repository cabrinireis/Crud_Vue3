import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { makeServer } from './mirage'
import App from './App.vue'
import router from './router'

import vuetifyPlugin from './plugins/vuetify'
console.log(import.meta.env.MODE)
if (import.meta.env.MODE === 'development') {
  makeServer()
}
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetifyPlugin)

app.mount('#app')
