import { createFileRoute, redirect } from '@tanstack/react-router'

import LoginForm from '@/containers/Login/LoginForm'
import { store } from '@/redux/store'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isLogged = store.getState().auth.isLogged

    if (isLogged) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: Login,
})

function Login() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#2f3349]">
      <LoginForm />
    </div>
  )
}
