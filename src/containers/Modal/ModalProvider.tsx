import SubjectModal from '@/containers/Subject/SubjectModal'
import TeacherModal from '@/containers/Teachers/TeacherModal'

import ModalDanger from './ModalDanger'

const ModalProvider = () => {
  return (
    <>
      <SubjectModal />
      <TeacherModal />
      <ModalDanger />
    </>
  )
}

export default ModalProvider
