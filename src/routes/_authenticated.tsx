import { createFileRoute, redirect } from '@tanstack/react-router'

import WebLayout from '@/layouts/WebLayout'
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
  component: WebLayout,
})
