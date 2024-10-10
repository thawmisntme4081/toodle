import { createApi } from '@reduxjs/toolkit/query/react'

import { Response } from '@/types/response.type'
import { Teacher, TeacherReq } from '@/types/teacher.type'
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
      query: () => ({
        url: 'teachers',
        method: 'POST',
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
  useDeleteTeacherMutation,
} = teacherApi
