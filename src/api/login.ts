import { axiosInstance } from './axiosInstance'

export async function login(data: any) {
  const response = await axiosInstance.post('auth/sign-in', data)
  return response
}

export async function logout() {
  const response = await axiosInstance.post('auth/sign-out')
  return response
}
