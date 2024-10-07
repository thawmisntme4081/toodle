import { toast } from 'sonner'

import { ERROR_STATUS_CODE } from '@/enums/errorCodes.enum'

const CONFLICT_REGEX = /Key \((.*)\)=\((.*)\)/

export const handleError = (error: any) => {
  if (error.status === ERROR_STATUS_CODE.CONFLICT) {
    const match = error.data.message.match(CONFLICT_REGEX)
    if (match) {
      toast.error(`${match[2]} already exists.`)
    }
    return
  }
  toast.error(error.data.message)
}
