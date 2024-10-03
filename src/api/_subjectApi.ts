import { createApi } from '@reduxjs/toolkit/query/react'

import { Response } from '@/types/response.type'
import { Subject } from '@/types/subject.type'
import { defaultConfig } from '@/utils/createApi.config'

export const subjectApi = createApi({
  ...defaultConfig('subjectApi', { credentials: 'include' }),
  endpoints: (build) => ({
    getSujects: build.query<Response<Subject[]>, void>({
      query: () => ({
        url: 'subjects',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetSujectsQuery } = subjectApi
