import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import RemoveClass from '@/containers/Classes/RemoveClass'
import DeleteSubject from '@/containers/Subjects/DeleteSubject'
import DeleteTeacher from '@/containers/Teachers/DeleteTeacher'
import ModalLayout from '@/layouts/ModalLayout'
import { RootState } from '@/redux/store'
import { ModalName } from '@/types/modal.type'

type ComponentMapType = {
  [K in ModalName]?: ReactNode
}

const ModalDanger = () => {
  const { open, dangerDescription, type, name } = useSelector(
    (state: RootState) => state.modal,
  )

  if (!dangerDescription || !type || !name) return null

  const ComponentMap: ComponentMapType = {
    subject: <DeleteSubject />,
    teacher: <DeleteTeacher />,
    class: <RemoveClass />,
  }

  return (
    <ModalLayout
      open={open && type === 'delete'}
      description={dangerDescription}
    >
      {ComponentMap[name as ModalName]}
    </ModalLayout>
  )
}

export default ModalDanger
