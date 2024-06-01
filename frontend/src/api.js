import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
     async (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    error => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  
        try {
          const res = await api.post('/api/token/refresh/', { refresh: refreshToken })
          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`
            return api(originalRequest)
          }
        } catch (err) {
          console.log(err)
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
)

export default api
