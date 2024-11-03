import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/api'
import { ROLES } from '@/enums/roles.enum'
import { getFallBackAvatar } from '@/utils/getFallBackAvatar.util'

interface AuthState {
  firstName: string | null
  lastName: string
  fullName: string
  avatar: string
  role: ROLES | null
  roleText: string
  userId: string
  isLogged: boolean
  fallBackAvatar: string
}

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  fullName: '',
  role: null,
  roleText: '',
  avatar: '',
  userId: '',
  isLogged: false,
  fallBackAvatar: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        if (action.payload.data.is_active) {
          const { first_name, last_name, role, id } = action.payload.data
          state.firstName = first_name
          state.lastName = last_name
          state.fullName = first_name ? `${first_name} ${last_name}` : last_name
          state.role = role
          state.roleText =
            Object.keys(ROLES)[Object.values(ROLES).indexOf(role)]
          state.userId = id
          state.fallBackAvatar = getFallBackAvatar(first_name, last_name)
          state.isLogged = true
        }
        if (action.payload.data.is_active === false) {
          state.userId = action.payload.data.id
          state.role = action.payload.data.role
        }
      },
    )
    builder.addMatcher(
      authApi.endpoints.changePassword.matchFulfilled,
      (state, action) => {
        if (action.payload.data.is_active) {
          const { first_name, last_name, role, id } = action.payload.data
          state.firstName = first_name
          state.lastName = last_name
          state.fullName = first_name ? `${first_name} ${last_name}` : last_name
          state.role = role
          state.roleText =
            Object.keys(ROLES)[Object.values(ROLES).indexOf(role)]
          state.userId = id
          state.fallBackAvatar = getFallBackAvatar(first_name, last_name)
          state.isLogged = true
        }
      },
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      Object.assign(state, initialState)
    })
  },
})

export const { logout } = authSlice.actions
export const { reducer: authReducer } = authSlice
