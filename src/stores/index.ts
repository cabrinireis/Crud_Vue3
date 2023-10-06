import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index'
export const susStore = defineStore('sus', {
  state: () => ({
    modalActive: false,
    patientList: [],
    user: '' as string,
    adress: null,
    notification: {
      active: false,
      text: 'Exemple',
      type: 'error'
    },
    isAuthenticated: false as boolean
  }),
  // getters: {
  //   doubleCount: (state) => state.count * 2
  // },
  actions: {
    async login(value: { user: string; pass: string }) {
      await axios
        .post('/api/login', value)
        .then((res) => {
          if (res) {
            router.push('/list')
            this.user = value.user
            this.isAuthenticated = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
