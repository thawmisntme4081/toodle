import { createApi } from '@reduxjs/toolkit/query/react'

import {
  Teacher,
  TeacherReq,
  TeacherUpdateReq,
} from '@/containers/Teachers/teacher.type'
import { Response } from '@/types/response.type'
import { defaultConfig } from '@/utils/createApi.config'

export const teacherApi = createApi({
  ...defaultConfig('teacherApi', { credentials: 'include' }),
  tagTypes: ['Teacher'],
  endpoints: (build) => ({
    getTeachers: build.query<Response<Teacher[]>, void>({
      query: () => ({
        url: 'teachers',
        method: 'GET',
      }),
      providesTags: ['Teacher'],
    }),
    createTeacher: build.mutation<Response<Teacher>, TeacherReq>({
      query: (body) => ({
        url: 'teachers',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Teacher']),
    }),
    updateTeacher: build.mutation<Response<null>, TeacherUpdateReq>({
      query: ({ id, ...body }) => ({
        url: `teachers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Teacher']),
    }),
    deleteTeacher: build.mutation<Response<null>, string>({
      query: (id) => ({
        url: `teachers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Teacher']),
    }),
  }),
})

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi
