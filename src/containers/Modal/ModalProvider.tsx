import ClassModal from '@/containers/Classes/ClassModal'
import SubjectModal from '@/containers/Subject/SubjectModal'
import TeacherModal from '@/containers/Teachers/TeacherModal'

import ModalDanger from './ModalDanger'

const ModalProvider = () => {
  return (
    <>
      <SubjectModal />
      <TeacherModal />
      <ClassModal />
      <ModalDanger />
    </>
  )
}

export default ModalProvider
