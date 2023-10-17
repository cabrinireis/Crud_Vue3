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
    loading: false as boolean,
    isAuthenticated: false as boolean
  }),
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
    async getPatients() {
      this.loading = true
      await axios
        .get(url, { params: { query: this.search } })
        .then(({ data }) => {
          this.patientList = data.response
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
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
    async createPatient(value: object) {
      await axios
        .post('/api/patients/', value)
        .then((res) => {
          if (res) {
            console.log(res)
          }
        })
        .catch((error) => {
          console.log(error)
        })
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
