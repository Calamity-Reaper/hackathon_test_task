import axios from 'axios'

export const API_URL = 'http://localhost:5000'
export const API_STATIC = 'http://localhost:5000/static/'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
