import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth.hook'

const Dashboard = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate({ to: '/' })
  }

  return (
    <div>
      Dashboard
      <Button onClick={handleSignOut}>Logout</Button>
    </div>
  )
}

export default Dashboard
