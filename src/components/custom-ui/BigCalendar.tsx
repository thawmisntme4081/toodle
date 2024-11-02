import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { cn } from '@/lib/utils'

import '@/styles/big-calendar.css'

const localizer = momentLocalizer(moment)

interface BigCalendarProps {
  className: string
}

const BigCalendar = ({ className, ...props }: BigCalendarProps) => {
  return <Calendar localizer={localizer} className={cn(className)} {...props} />
}

export default BigCalendar
