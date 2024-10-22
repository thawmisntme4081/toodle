import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/api'
import { ROLES } from '@/enums/roles.enum'
import { getFallBackAvatar } from '@/utils/getFallBackAvatar.util'

interface AuthState {
  firstName: string | null
  lastName: string
  avatar: string
  role: ROLES | null
  userId: string
  isLogged: boolean
  fallBackAvatar: string
}

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  role: null,
  avatar: '',
  userId: '',
  isLogged: false,
  fallBackAvatar: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.firstName = action.payload.data.first_name
        state.lastName = action.payload.data.last_name
        state.role = action.payload.data.role
        state.userId = action.payload.data.id
        state.fallBackAvatar = getFallBackAvatar(
          action.payload.data.first_name,
          action.payload.data.last_name,
        )
        state.isLogged = true
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      Object.assign(state, initialState)
    })
  },
})

export const { reducer: authReducer } = authSlice
