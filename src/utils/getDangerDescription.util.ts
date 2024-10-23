import { TypeModal } from '@/redux/slices/modal.slice'
import { ModalName } from '@/types/modal.type'

export const getDangerDescription = (
  type: TypeModal,
  name: ModalName,
  dataName?: string,
) => {
  if (type !== 'delete') return ''
  if (name === 'logout') return 'Are you sure you want to logout?'
  if (dataName) return `Are you sure you want to ${type} ${dataName}?`
  return ''
}
