import { createLazyFileRoute } from '@tanstack/react-router'

import { TeacherManagement } from '@/containers/Teachers/TeacherManagement'

export const Route = createLazyFileRoute('/_authenticated/teachers')({
  component: TeacherManagement,
})
