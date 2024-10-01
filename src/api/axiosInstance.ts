import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://toodle-api.vercel.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)
