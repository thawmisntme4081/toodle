import { fetchBaseQuery, FetchBaseQueryArgs } from '@reduxjs/toolkit/query'

const API_BASE_URL = 'https://toodle-api.vercel.app/api/'
export const defaultConfig = (
  apiName: string,
  options: FetchBaseQueryArgs = {},
) => {
  return {
    reducerPath: apiName,
    baseQuery: fetchBaseQuery({
      baseUrl: API_BASE_URL,
      ...options,
    }),
  }
}
