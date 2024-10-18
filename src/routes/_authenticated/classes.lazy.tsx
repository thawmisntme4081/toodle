import { createLazyFileRoute } from '@tanstack/react-router'

import ClassPage from '@/containers/Classes/ClassPage'

export const Route = createLazyFileRoute('/_authenticated/classes')({
  component: ClassPage,
})
