import { createLazyFileRoute } from '@tanstack/react-router'

import Subject from '@/containers/Subject/Subject'

export const Route = createLazyFileRoute('/_authenticated/subjects')({
  component: Subject,
})
