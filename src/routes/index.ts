import { createFileRoute, redirect } from '@tanstack/react-router'

import { store } from '@/redux/store'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const isLogged = store.getState().auth.isLogged
    if (!isLogged) {
      throw redirect({
        to: '/login',
      })
    }
    throw redirect({
      to: '/dashboard',
    })
  },
})
