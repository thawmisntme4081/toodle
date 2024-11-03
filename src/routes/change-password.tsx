import { createFileRoute, redirect } from '@tanstack/react-router'

import ChangePasswordForm from '@/containers/Login/ChangePasswordForm'
import { store } from '@/redux/store'

export const Route = createFileRoute('/change-password')({
  beforeLoad: () => {
    const isLogged = store.getState().auth.isLogged
    if (isLogged) {
      throw redirect({
        to: '/',
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
