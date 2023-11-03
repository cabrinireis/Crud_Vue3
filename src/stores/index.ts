import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import router from '@/router/index'

const setError = {
  active: true,
  text: 'Ocorreu um erro, tente novamente mais tarde.',
  type: 'error' as notyType
}

const entity = '/patients'
type notyType = 'success' | 'info' | 'warning' | 'error' | undefined

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
      text: '',
      type: '' as notyType
    },
    search: '' as string,
    loading: false as boolean,
    isAuthenticated: false as boolean
  }),
  actions: {
    setNotification() {
      console.log('errr', setError)
      this.notification = { ...setError }
    },
    async login(value: { user: string; pass: string }) {
      await axios.post('/api/login', value).then((res) => {
        if (res) {
          router.push('/list')
          this.user = value.user
          this.isAuthenticated = true
          sessionStorage.setItem('isAuthenticated', JSON.stringify(this.user))
          this.notification = {
            type: 'success',
            active: true,
            text: 'Seja bem vindo(a).'
          }
        }
      })
      // .catch(() => {
      //   this.notification = { ...setError }
      // })
    },
    async getPatients() {
      this.loading = true
      await axios
        .get(entity, { params: { query: this.search } })
        .then(({ data }) => {
          this.patientList = data.response
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getPatient(id: string) {
      await axios.get(`${entity}/${id}`).then((res) => {
        this.patient = res.data.patient
      })
    },
    async createPatient(value: object) {
      await axios
        .post(entity, value)
        .then((res) => {
          if (res) {
            this.getPatients()
            this.notification = {
              type: 'success',
              active: true,
              text: 'Paciente adicionado com sucesso.'
            }
          }
        })
        .catch((error) => {
          this.notification = { ...setError }
          console.log(error)
        })
    },
    async deletePatient(id: string) {
      axios.delete(`${entity}/${id}`).then((res) => {
        if (res) {
          this.getPatients()
          this.notification = {
            type: 'success',
            active: true,
            text: 'Paciente Excluido com sucesso.'
          }
        }
      })
    },
    async updatePatient(value: object) {
      await axios.post(`${entity}/${value.id}`, { params: value }).then((res) => {
        if (res) {
          this.getPatients()
          this.notification = {
            type: 'success',
            active: true,
            text: 'Paciente editado com sucesso.'
          }
        }
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
