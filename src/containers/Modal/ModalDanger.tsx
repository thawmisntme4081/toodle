import { useSelector } from 'react-redux'

import DeleteAction from '@/containers/Subject/DeleteAction'
import { RootState } from '@/redux/store'

import ModalLayout from './ModalLayout'

const ModalDanger = () => {
  const { open, dangerDescription, type } = useSelector(
    (state: RootState) => state.modal,
  )

  if (!dangerDescription) return null

  return (
    <ModalLayout
      open={open && type === 'delete'}
      description={dangerDescription}
    >
      <DeleteAction />
    </ModalLayout>
  )
}

export default ModalDanger
