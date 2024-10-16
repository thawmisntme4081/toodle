import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

type Props = {
  open: boolean
  title?: string
  description: string
  children: ReactNode
  className?: string
}
const ModalLayout = ({
  open,
  title,
  description,
  children,
  className,
}: Props) => {
  const dispatch = useAppDispatch()

  const defaultTitle = useSelector(
    (state: RootState) => state.modal.defaultTitle,
  )

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent className={cn('sm:max-w-md', className)}>
        <DialogHeader>
          <DialogTitle>{title ?? defaultTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default ModalLayout
