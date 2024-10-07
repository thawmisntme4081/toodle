import { useSelector } from 'react-redux'

import ModalLayout from '@/containers/Modal/ModalLayout'
import { RootState } from '@/redux/store'

import SubjectForm from './SubjectForm'

const SubjectModal = () => {
  const { open, name, type } = useSelector((state: RootState) => state.modal)

  if (!type || type === 'delete') return null

  return (
    <ModalLayout
      open={open && name === 'subject'}
      description={
        type === 'create'
          ? 'Create a new subject here.'
          : 'Edit the subject here.'
      }
    >
      <SubjectForm type={type} />
    </ModalLayout>
  )
}

export default SubjectModal
