import { createLazyFileRoute } from '@tanstack/react-router'

import ClassPage from '@/containers/Class/ClassPage'

export const Route = createLazyFileRoute('/_authenticated/classes')({
  component: ClassPage,
})
