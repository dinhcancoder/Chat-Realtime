import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '~/types/auth.type'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  setAccessTokenLocalToStorage,
  setProfileLocalStorage
} from './auth'

class Http {
  instance: AxiosInstance
  private access_token: string

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api/v1/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token) {
          config.headers.Authorization = this.access_token
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === 'login') {
          const data = response.data as AuthResponse
          this.access_token = data.data.access_token
          setAccessTokenLocalToStorage(this.access_token)
          setProfileLocalStorage(data.data.user)
        } else if (url === 'logout') {
          this.access_token = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        toast.error(error.message)
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
