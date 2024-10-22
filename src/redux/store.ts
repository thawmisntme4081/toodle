import { useDispatch } from 'react-redux'
import {
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import {
  authApi,
  classApi,
  gradeApi,
  studentApi,
  subjectApi,
  teacherApi,
} from '@/api'
import { handleError } from '@/utils/handleError.util'

import { rootReducer } from './rootReducer'

const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      handleError(action.payload)
    }
    return next(action)
  }

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      classApi.middleware,
      gradeApi.middleware,
      studentApi.middleware,
      subjectApi.middleware,
      teacherApi.middleware,
      rtkQueryErrorLogger,
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

setupListeners(store.dispatch)
