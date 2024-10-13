import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'
import { Teacher } from '@/types/teacher.type'

type Props = {
  item: Teacher
}

const Actions = ({ item }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary hover:text-white"
        onClick={() =>
          dispatch(openModal({ name: 'teacher', type: 'update', data: item }))
        }
      >
        <IconEdit />
        Edit
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
        <IconTrash />
        Delete
      </Button>
    </div>
  )
}

export default Actions
