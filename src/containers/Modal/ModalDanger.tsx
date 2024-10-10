import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import DeleteSubject from '@/containers/Subject/DeleteSubject'
import DeleteTeacher from '@/containers/Teachers/DeleteTeacher'
import { RootState } from '@/redux/store'
import { ModalName } from '@/types/modal.type'

import ModalLayout from './ModalLayout'

type ComponentMapType = {
  [K in ModalName]?: ReactNode
}

const ModalDanger = () => {
  const { open, dangerDescription, type } = useSelector(
    (state: RootState) => state.modal,
  )

  if (!dangerDescription || !type) return null

  const ComponentMap: ComponentMapType = {
    subject: <DeleteSubject />,
    teacher: <DeleteTeacher />,
  }

  return (
    <ModalLayout
      open={open && type === 'delete'}
      description={dangerDescription}
    >
      {ComponentMap[type as ModalName]}
    </ModalLayout>
  )
}

export default ModalDanger
