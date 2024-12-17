import axios from 'axios'

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error('NEXT_PUBLIC_API_URL nie jest zdefiniowany!')
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login?sessionExpired=true'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance