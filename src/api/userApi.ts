import axios from 'axios'

export const userApi = axios.create({
  baseURL: 'https://toodle-api.vercel.app/api/auth/sign-in',
  headers: {
    'Content-Type': 'application/json',
  },
})
