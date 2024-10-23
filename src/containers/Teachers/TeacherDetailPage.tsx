import { Route } from '@/routes/_authenticated/teachers/$teacherId.lazy'

const TeacherDetailPage = () => {
  const { teacherId } = Route.useParams()

  return <div>{`TeacherDetailPage ${teacherId}`}</div>
}

export default TeacherDetailPage
