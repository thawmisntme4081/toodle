import { useSelector } from 'react-redux'

import ModalLayout from '@/layouts/ModalLayout'
import { RootState } from '@/redux/store'

import TeacherForm from './TeacherForm'

const TeacherModal = () => {
  const { open, name, type } = useSelector((state: RootState) => state.modal)

  if (!type || type === 'delete') return null

  return (
    <ModalLayout
      open={open && name === 'teacher'}
      className="lg:max-w-2xl"
      title="Add teacher"
      description={
        type === 'add' ? 'Teacher information' : 'Edit the teacher here.'
      }
    >
      <TeacherForm type={type} />
    </ModalLayout>
  )
}

export default TeacherModal
