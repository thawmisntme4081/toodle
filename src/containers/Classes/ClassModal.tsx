import { useSelector } from 'react-redux'

import ModalLayout from '@/layouts/ModalLayout'
import { RootState } from '@/redux/store'

import ClassForm from './ClassForm'

const ClassModal = () => {
  const { open, name, type } = useSelector((state: RootState) => state.modal)

  if (!type || type === 'delete') return null

  return (
    <ModalLayout
      open={open && name === 'class'}
      className="lg:max-w-2xl"
      description={
        type === 'create' ? 'Class information' : 'Edit the class here.'
      }
    >
      <ClassForm type={type} />
    </ModalLayout>
  )
}

export default ClassModal
