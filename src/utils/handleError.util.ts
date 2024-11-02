import { toast } from 'sonner'

import { ERROR_STATUS_CODE } from '@/enums/errorCodes.enum'
import { openModal } from '@/redux/slices/modal.slice'
import { store } from '@/redux/store'

const CONFLICT_REGEX = /Key \((.*)\)=\((.*)\)/

export const handleError = (error: any) => {
  switch (error.status) {
    case ERROR_STATUS_CODE.CONFLICT: {
      const match = error.data.message.match(CONFLICT_REGEX)
      if (match) {
        toast.error(`${match[2]} already exists.`)
      }
      break
    }
    case ERROR_STATUS_CODE.UNAUTHORIZE:
      store.dispatch(
        openModal({
          name: 'force-logout',
          type: 'info',
          data: {
            title: error.data.message,
          },
        }),
      )
      break

    default:
      toast.error(error.data.message)
      break
  }
}
