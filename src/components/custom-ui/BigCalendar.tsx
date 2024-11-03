import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { cn } from '@/lib/utils'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/styles/big-calendar.css'

const localizer = momentLocalizer(moment)

type Event = {
  start: Date
  end: Date
  title: string
  color?: string
}

type BigCalendarProps = {
  events: Event[]
  className?: string
}

const BigCalendar = ({ events, className }: BigCalendarProps) => {
  return (
    <Calendar
      localizer={localizer}
      className={cn(className)}
      startAccessor="start"
      endAccessor="end"
      events={events}
      eventPropGetter={(event) => ({
        style: {
          backgroundColor: event.color,
        },
      })}
    />
  )
}

export default BigCalendar
