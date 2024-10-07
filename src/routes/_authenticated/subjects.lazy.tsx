import { createLazyFileRoute } from '@tanstack/react-router'

import SubjectPage from '@/containers/Subject/SubjectPage'

export const Route = createLazyFileRoute('/_authenticated/subjects')({
  component: SubjectPage,
})
