import { createLazyFileRoute } from '@tanstack/react-router'

import { StudentPage } from '@/containers/Students/StudentPage'

export const Route = createLazyFileRoute('/_authenticated/students')({
  component: StudentPage,
})
