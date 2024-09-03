import { createLazyFileRoute } from '@tanstack/react-router'

import Dashboard from '@/containers/Dashboard/Dashboard'

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})
