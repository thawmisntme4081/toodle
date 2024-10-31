import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Route } from '@/routes/_authenticated/teachers/$teacherId.lazy'

import '@/big-calendar.css'

const events = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
    color: 'red',
  },
]

const localizer = momentLocalizer(moment)

const TeacherDetailPage = () => {
  const { teacherId } = Route.useParams()

  return (
    <>
      <div>{`TeacherDetailPage ${teacherId}`}</div>
      <div>
        <BigCalendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events}
          style={{ height: 500 }}
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
