import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'
import { Class } from '@/types/class.type'

type Props = {
  item: Class
}

const Actions = ({ item }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="justify-start gap-2 text-yellow-500 hover:bg-yellow-400 hover:text-white"
        onClick={() =>
          dispatch(openModal({ name: 'class', type: 'update', data: item }))
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
              name: 'class',
              type: 'delete',
              data: {
                name: `${item.name}`,
                id: item.id,
              },
            }),
          )
        }
      >
        <IconTrash className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default Actions
