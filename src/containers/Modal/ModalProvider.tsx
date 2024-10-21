import ClassModal from '@/containers/Classes/ClassModal'
import StudentModal from '@/containers/Students/StudentModal'
import SubjectModal from '@/containers/Subject/SubjectModal'
import TeacherModal from '@/containers/Teachers/TeacherModal'

import ModalDanger from './ModalDanger'

const ModalProvider = () => {
  return (
    <>
      <SubjectModal />
      <TeacherModal />
      <StudentModal />
      <ClassModal />
      <ModalDanger />
    </>
  )
}

export default ModalProvider
