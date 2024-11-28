import {
  fetchBaseQuery,
  FetchBaseQueryArgs,
  retry,
} from '@reduxjs/toolkit/query'

const MAX_RETRIES = 2

export const defaultConfig = (
  apiName: string,
  options: FetchBaseQueryArgs = {},
) => {
  return {
    reducerPath: apiName,
    baseQuery: retry(
      fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        ...options,
      }),
      { maxRetries: MAX_RETRIES },
    ),
  }
}
