import { createApi } from '@reduxjs/toolkit/query/react'

import { Response } from '@/types/response.type'
import { Subject, SubjectReq } from '@/types/subject.type'
import { defaultConfig } from '@/utils/createApi.config'

export const subjectApi = createApi({
  ...defaultConfig('subjectApi', { credentials: 'include' }),
  tagTypes: ['Subject'],
  endpoints: (build) => ({
    getSujects: build.query<Response<Subject[]>, void>({
      query: () => ({
        url: 'subjects',
        method: 'GET',
      }),
      providesTags: ['Subject'],
    }),
    createSubject: build.mutation<Response<Subject[]>, SubjectReq>({
      query: (body) => ({
        url: 'subjects',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Subject'],
    }),
    updateSubject: build.mutation<Response<void>, Subject>({
      query: ({ id, name }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: name,
      }),
      invalidatesTags: ['Subject'],
    }),
    deleteSubject: build.mutation<Response<void>, string>({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subject'],
    }),
  }),
})

export const {
  useGetSujectsQuery,
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApi
