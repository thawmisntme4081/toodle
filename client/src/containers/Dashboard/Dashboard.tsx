import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth.hook'

import HorizontalNavBar from '../Navbar/HorizontalNavBar'
import Navbar from '../Navbar/Navbar'

const Dashboard = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate({ to: '/' })
  }

  return (
    <div className="flex">
      <Navbar />
      <div className='p-4 flex-1'>
        <HorizontalNavBar />
        <div>Hello from Dashboard!</div>
        <Button onClick={handleSignOut}>Logout</Button>
      </div>
    </div>
  )
}

export default Dashboard
