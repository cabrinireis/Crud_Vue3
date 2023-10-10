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
    },
    async getPatient(state: string | '') {
      let url = '/api/patients'
      const params = {
        query: state
      }
      const urlPaarams =
        state !== undefined ? (url += '?' + new URLSearchParams(params).toString()) : url
      await axios
        .get(urlPaarams)
        .then((response) => {
          this.patientList = response.data.patients
          // const res = JSON.parse(response._bodyText)
          // this.patientList = res
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
