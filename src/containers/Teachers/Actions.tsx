import { useSelector } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { ROLES } from '@/enums/roles.enum'
import { IconEdit, IconEye, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

import { Teacher } from './teacher.type'

type Props = {
  item: Teacher
}

const Actions = ({ item }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userRole = useSelector((state: RootState) => state.auth.role)

  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant="ghost"
        className="justify-start gap-2 text-[#00bad1] hover:bg-[#00bad1] hover:text-white"
        onClick={() => navigate({ to: `/teachers/${item.id}` })}
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
                openModal({ name: 'teacher', type: 'update', data: item }),
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
                  name: 'teacher',
                  type: 'delete',
                  data: {
                    name: `${item.first_name} ${item.last_name}`,
                    id: item.id,
                  },
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
