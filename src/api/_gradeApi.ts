import { createApi } from '@reduxjs/toolkit/query/react'

import { Grade } from '@/types/grade.type'
import { Response } from '@/types/response.type'
import { defaultConfig } from '@/utils/createApi.config'

export const gradeApi = createApi({
  ...defaultConfig('gradeApi', { credentials: 'include' }),
  //   tagTypes: ['Grade'],
  endpoints: (build) => ({
    getGrade: build.query<Response<Grade[]>, void>({
      query: () => ({
        url: 'grades',
        method: 'GET',
      }),
      //   providesTags: ['Grade'],
    }),
  }),
})

export const { useGetGradeQuery } = gradeApi
