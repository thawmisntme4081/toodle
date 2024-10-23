import { createLazyFileRoute } from '@tanstack/react-router'

import { TeacherPage } from '@/containers/Teachers/TeacherPage'

export const Route = createLazyFileRoute('/_authenticated/teachers/')({
  component: TeacherPage,
})
