import { createFileRoute, redirect } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth.hook'

export const Route = createFileRoute('/login')({
  beforeLoad({ context }) {
    const { isLogged } = context.auth
    if (isLogged()) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: Login,
})

function Login() {
  const { signIn } = useAuth()
  return <Button onClick={signIn}>Login</Button>
}
