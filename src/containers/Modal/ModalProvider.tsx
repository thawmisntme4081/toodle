import ClassModal from '@/containers/Classes/ClassModal'
import StudentModal from '@/containers/Students/StudentModal'
import SubjectModal from '@/containers/Subjects/SubjectModal'
import TeacherModal from '@/containers/Teachers/TeacherModal'

import LogoutModal from './LogoutModal'
import ModalDanger from './ModalDanger'

const ModalProvider = () => {
  return (
    <>
      <LogoutModal />
      <SubjectModal />
      <TeacherModal />
      <StudentModal />
      <ClassModal />
      <ModalDanger />
    </>
  )
}

export default ModalProvider
