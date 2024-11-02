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
        <BigCalendar
          startAccessor="start"
          endAccessor="end"
          events={events}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
      </div>
    </>
  )
}

export default TeacherDetailPage
