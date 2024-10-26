import { createFileRoute, redirect } from '@tanstack/react-router'

import AppLayout from '@/layouts/AppLayout'
import { store } from '@/redux/store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const isLogged = store.getState().auth.isLogged

    if (!isLogged) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AppLayout,
})
