import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  description: string
  children: ReactNode
  className?: string
}
const ModalLayout = ({ open, description, children, className }: Props) => {
  const dispatch = useAppDispatch()

  const defaultTitle = useSelector(
    (state: RootState) => state.modal.defaultTitle,
  )

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent className={cn('sm:max-w-md', className)}>
        <DialogHeader>
          <DialogTitle>{defaultTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalLayout
