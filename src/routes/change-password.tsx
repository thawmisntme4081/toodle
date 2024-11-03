import { createFileRoute, redirect } from '@tanstack/react-router'

import ChangePasswordForm from '@/containers/Login/ChangePasswordForm'
import { store } from '@/redux/store'

export const Route = createFileRoute('/change-password')({
  beforeLoad: () => {
    const isFirstAccess = store.getState().auth.userId

    if (isFirstAccess === '') {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: ChangePassword,
})

function ChangePassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#2f3349]">
      <ChangePasswordForm />
    </div>
  )
}
