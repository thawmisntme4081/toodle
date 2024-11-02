import {
  fetchBaseQuery,
  FetchBaseQueryArgs,
  retry,
} from '@reduxjs/toolkit/query'

const MAX_RETRIES = 2
const API_BASE_URL = 'https://toodle-api.vercel.app/api/'
export const defaultConfig = (
  apiName: string,
  options: FetchBaseQueryArgs = {},
) => {
  return {
    reducerPath: apiName,
    baseQuery: retry(
      fetchBaseQuery({
        baseUrl: API_BASE_URL,
        ...options,
      }),
      { maxRetries: MAX_RETRIES },
    ),
  }
}
