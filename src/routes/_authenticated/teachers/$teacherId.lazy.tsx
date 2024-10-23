import { createLazyFileRoute } from '@tanstack/react-router'

import TeacherDetailPage from '@/containers/Teachers/TeacherDetailPage'

export const Route = createLazyFileRoute('/_authenticated/teachers/$teacherId')(
  {
    component: TeacherDetailPage,
  },
)
