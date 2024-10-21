import { createApi } from '@reduxjs/toolkit/query/react'

import {
  Class,
  ClassReq,
  UpdateClassReq,
} from '@/containers/Classes/class.type'
import { Response } from '@/types/response.type'
import { defaultConfig } from '@/utils/createApi.config'

export const classApi = createApi({
  ...defaultConfig('classApi', { credentials: 'include' }),
  tagTypes: ['Class'],
  endpoints: (build) => ({
    getClasses: build.query<Response<Class[]>, void>({
      query: () => ({
        url: 'classes',
        method: 'GET',
      }),
      providesTags: ['Class'],
    }),
    createClass: build.mutation<Response<Class[]>, ClassReq>({
      query: (body) => ({
        url: 'classes',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Class']),
    }),
    updateClass: build.mutation<Response<null>, UpdateClassReq>({
      query: ({ id, ...body }) => ({
        url: `classes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Class']),
    }),
    deleteClass: build.mutation<Response<null>, string>({
      query: (id) => ({
        url: `classes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Class']),
    }),
  }),
})

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi
