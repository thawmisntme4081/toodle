import { useSelector } from 'react-redux'

import ModalLayout from '@/containers/Modal/ModalLayout'
import { RootState } from '@/redux/store'

import TeacherForm from './TeacherForm'

const TeacherModal = () => {
  const { open, name, type } = useSelector((state: RootState) => state.modal)

  if (!type || type === 'delete') return null

  return (
    <ModalLayout
      open={open && name === 'teacher'}
      description={
        type === 'create'
          ? 'Create a new teacher here.'
          : 'Edit the teacher here.'
      }
    >
      <TeacherForm type={type} />
    </ModalLayout>
  )
}

export default TeacherModal