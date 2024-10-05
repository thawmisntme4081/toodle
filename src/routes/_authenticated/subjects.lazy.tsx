import { createLazyFileRoute } from '@tanstack/react-router'

import SubjectManagement from '@/containers/Subject/SubjectManagement'

export const Route = createLazyFileRoute('/_authenticated/subjects')({
  component: SubjectManagement,
})
