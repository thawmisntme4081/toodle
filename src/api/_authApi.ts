import { createApi } from '@reduxjs/toolkit/query/react'

import { Response } from '@/types/response.type'
import { LoginReq, LoginRes } from '@/types/user.type'
import { defaultConfig } from '@/utils/createApi.config'

export const authApi = createApi({
  ...defaultConfig('authApi', { credentials: 'include' }),
  endpoints: (build) => ({
    login: build.mutation<Response<LoginRes>, LoginReq>({
      query: (userData) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: build.mutation<Response<null>, void>({
      query: () => ({
        url: 'auth/sign-out',
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
