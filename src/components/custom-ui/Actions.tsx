import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { ROLES } from '@/enums/roles.enum'
import { IconEdit, IconEye, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { ModalName } from '@/types/modal.type'

type Props = {
  modalName: Exclude<ModalName, 'subject' | 'logout'>
  itemEdit: { id: string }
  dataDelete?: {
    name: string
    id: string
  }
}

const Actions = ({ itemEdit, modalName, dataDelete }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userRole = useSelector((state: RootState) => state.auth.role)

  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant="ghost"
        className="justify-start gap-2 text-[#00bad1] hover:bg-[#00bad1] hover:text-white"
        onClick={() => navigate({ to: `${location.pathname}/${itemEdit.id}` })}
      >
        <IconEye className="h-5 w-5" />
      </Button>
      {userRole === ROLES.ADMIN && (
        <>
          <Button
            variant="ghost"
            className="justify-start gap-2 text-yellow-500 hover:bg-yellow-400 hover:text-white"
            onClick={() =>
              dispatch(
                openModal({ name: modalName, type: 'update', data: itemEdit }),
              )
            }
          >
            <IconEdit className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 text-destructive hover:bg-destructive hover:text-white"
            onClick={() =>
              dispatch(
                openModal({
                  name: modalName,
                  type: 'delete',
                  data: dataDelete,
                }),
              )
            }
          >
            <IconTrash className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  )
}

export default Actions
