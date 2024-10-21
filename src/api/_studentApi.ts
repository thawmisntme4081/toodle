import { createApi } from '@reduxjs/toolkit/query/react'

import {
  Student,
  StudentReq,
  StudentUpdateReq,
} from '@/containers/Students/student.type'
import { Response } from '@/types/response.type'
import { defaultConfig } from '@/utils/createApi.config'

export const studentApi = createApi({
  ...defaultConfig('studentApi', { credentials: 'include' }),
  tagTypes: ['Student'],
  endpoints: (build) => ({
    getStudents: build.query<Response<Student[]>, void>({
      query: () => ({
        url: 'students',
        method: 'GET',
      }),
      providesTags: ['Student'],
    }),
    addStudent: build.mutation<Response<Student>, StudentReq>({
      query: (body) => ({
        url: 'students',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Student']),
    }),
    updateStudent: build.mutation<Response<null>, StudentUpdateReq>({
      query: ({ id, ...body }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Student']),
    }),
    removeStudent: build.mutation<Response<null>, string>({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Student']),
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useRemoveStudentMutation,
} = studentApi
