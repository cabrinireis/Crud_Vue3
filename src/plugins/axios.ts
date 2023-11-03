import axios from 'axios'
import { susStore } from '@/stores'
const instance = axios.create({
  baseURL: 'http://localhost:3032/api'
})
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    return Promise.reject(susStore().setNotification())
  }
)
export default instance
