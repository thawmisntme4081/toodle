import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { useTimer } from '@/hooks/useTimer.hook'
import ModalLayout from '@/layouts/ModalLayout'
import { logout } from '@/redux/slices/auth.slice'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

const INIT_COUNT = 5

const LogoutModal = () => {
  const dispatch = useAppDispatch()
  const { open, data, type } = useSelector((state: RootState) => state.modal)

  const router = useRouter()

  const handleLogout = useCallback(() => {
    dispatch(logout())
    router.invalidate()
    dispatch(closeModal())
  }, [dispatch, router])

  const count = useTimer(INIT_COUNT, handleLogout, !!type)

  if (!type || type !== 'info') return null

  return (
    <ModalLayout
      open={open && type === 'info'}
      description={`Redirect to login in ${count}s`}
      title={data.title}
      onClose={handleLogout}
    >
      <div className="flex justify-end">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </ModalLayout>
  )
}

export default LogoutModal
