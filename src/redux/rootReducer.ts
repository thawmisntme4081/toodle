import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {
  authApi,
  classApi,
  gradeApi,
  studentApi,
  subjectApi,
  teacherApi,
} from '@/api'

import { authReducer } from './slices/auth.slice'
import { modalReducer } from './slices/modal.slice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(authPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedReducer,
  modal: modalReducer,
  [authApi.reducerPath]: authApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [gradeApi.reducerPath]: gradeApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
})

export const rtkMiddlewares = [
  authApi.middleware,
  classApi.middleware,
  gradeApi.middleware,
  studentApi.middleware,
  subjectApi.middleware,
  teacherApi.middleware,
]
