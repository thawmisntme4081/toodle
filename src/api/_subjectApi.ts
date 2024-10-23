import { createApi } from '@reduxjs/toolkit/query/react'

import { Subject, SubjectReq } from '@/containers/Subjects/subject.type'
import { Response } from '@/types/response.type'
import { defaultConfig } from '@/utils/createApi.config'

export const subjectApi = createApi({
  ...defaultConfig('subjectApi', { credentials: 'include' }),
  tagTypes: ['Subject'],
  endpoints: (build) => ({
    getSubjects: build.query<Response<Subject[]>, void>({
      query: () => ({
        url: 'subjects',
        method: 'GET',
      }),
      providesTags: ['Subject'],
    }),
    addSubject: build.mutation<Response<Subject[]>, SubjectReq>({
      query: (body) => ({
        url: 'subjects',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Subject']),
    }),
    updateSubject: build.mutation<Response<null>, Subject>({
      query: ({ id, name }) => ({
        url: `subjects/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Subject']),
    }),
    deleteSubject: build.mutation<Response<null>, string>({
      query: (id) => ({
        url: `subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Subject']),
    }),
  }),
})

export const {
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApi
