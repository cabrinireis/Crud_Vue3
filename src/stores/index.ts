import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index'
const url = '/api/patients'
export const susStore = defineStore('sus', {
  state: () => ({
    modalActive: false,
    patientList: [],
    fullCep: {} as object,
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
    adress: {
      city: '' as string,
      state: '' as string,
      ville: '' as string,
      addr: '' as string
    },
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
            this.getPatients()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async deletePatient(id: string) {
      axios
        .delete(`/api/patients/${id}`)
        .then((res) => {
          if (res) {
            this.getPatients()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async updatePatient(value: object) {
      await axios
        .post(`/api/patients/${value.id}`, { params: value })
        .then((res) => {
          if (res) {
            this.getPatients()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getCep(cep: string) {
      // axios not suport passthrough the miragejs
      const baseUrl = 'https://viacep.com.br/ws/'
      const url = `${baseUrl}${cep.replace(/\D/g, '')}/json/`
      const response = await fetch(url)
      const { localidade, uf, bairro, logradouro } = await response.json()
      this.adress = {
        city: localidade,
        state: uf,
        ville: bairro,
        addr: logradouro
      }
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
