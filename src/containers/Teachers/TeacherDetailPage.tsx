import moment from 'moment'

import BigCalendar from '@/components/custom-ui/BigCalendar'
import { Route } from '@/routes/_authenticated/teachers/$teacherId.lazy'

const events = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
    color: 'red',
  },
]

const TeacherDetailPage = () => {
  const { teacherId } = Route.useParams()

  return (
    <>
      <div>{`TeacherDetailPage ${teacherId}`}</div>
      <div>
        <BigCalendar events={events} />
      </div>
    </>
  )
}

export default TeacherDetailPage
