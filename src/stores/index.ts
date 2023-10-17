import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index'
const url = '/api/patients'
export const susStore = defineStore('sus', {
  state: () => ({
    modalActive: false,
    patientList: [],
    patient: {
      cns: '',
      src: '',
      name: '',
      motherName: '',
      photo_url: '',
      cep: '',
      cpf: '',
      birthday: '',
      adress: {
        city: '',
        state: '',
        ville: '',
        addr: ''
      }
    },
    user: '' as string,
    adress: null,
    notification: {
      active: false,
      text: 'Exemple',
      type: 'error'
    },
    search: '' as string,
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
            sessionStorage.setItem('isAuthenticated', JSON.stringify(this.user))
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getPatients(state: string) {
      await axios
        .get(url, { params: { query: this.search } })
        .then((response) => {
          this.patientList = response.data
          // const res = JSON.parse(response._bodyText)
          // this.patientList = res
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getPatient(id: string) {
      await axios
        .get(`/api/patients/${id}`)
        .then((res) => {
          this.patient = res.data.patient
        })
        .catch((error) => console.log(error))
    },
    setSearch(value: string | '') {
      this.search = value
    }
  },
  getters: {
    patientId(state) {
      return state.patient
    }
  }
})
