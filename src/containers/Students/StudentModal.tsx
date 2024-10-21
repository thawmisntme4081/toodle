import { useSelector } from 'react-redux'

import ModalLayout from '@/layouts/ModalLayout'
import { RootState } from '@/redux/store'

import StudentForm from './StudentForm'

const StudentModal = () => {
  const { open, name, type } = useSelector((state: RootState) => state.modal)

  if (!type || type === 'delete') return null

  return (
    <ModalLayout
      open={open && name === 'student'}
      className="lg:max-w-2xl"
      title="Add student"
      description={
        type === 'create' ? 'Student information' : 'Edit the student here.'
      }
    >
      <StudentForm type={type} />
    </ModalLayout>
  )
}

export default StudentModal
