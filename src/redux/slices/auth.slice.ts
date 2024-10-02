import { createSlice } from '@reduxjs/toolkit'

import { authApi } from '@/api'
import { ROLES } from '@/enums/roles.enum'

interface AuthState {
  firstName: string | null
  lastName: string
  avatar: string
  role: ROLES | null
  userId: string
  isLogged: boolean
}

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  role: null,
  avatar: '',
  userId: '',
  isLogged: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload
    },
    logout: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.firstName = action.payload.data.first_name
        state.lastName = action.payload.data.last_name
        state.role = action.payload.data.role
        state.userId = action.payload.data.id
        state.isLogged = true
      },
    )
  },
})

export const { setAvatar, logout } = authSlice.actions
export const { reducer: authReducer } = authSlice
