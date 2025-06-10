import axios from 'axios'
import { accessToken } from './tokenService'
import { HOST_API_SERVER_1 } from '.'

const apiService = axios.create({
  baseURL: HOST_API_SERVER_1,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiService
