import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:5159/api', // WaveApp backend
//   timeout: 10000
// })
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Optional: Add interceptors for auth tokens
api.interceptors.request.use(config => {
  const token = localStorage.getItem('wave_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
