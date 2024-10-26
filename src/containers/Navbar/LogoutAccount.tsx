import { useRouter } from '@tanstack/react-router'

import { useLogoutMutation } from '@/api/_authApi'
import { Button } from '@/components/ui/button'
import { closeModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'

const LogoutAccount = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [logout, { isLoading }] = useLogoutMutation()

  const handleLogout = async () => {
    await logout().unwrap()
    router.invalidate()
    dispatch(closeModal())
  }
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => dispatch(closeModal())}
      >
        Cancel
      </Button>
      <Button variant="destructive" disabled={isLoading} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default LogoutAccount
