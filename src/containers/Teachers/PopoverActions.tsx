import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconEdit, IconMoreHorizontal, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'
import { Teacher } from '@/types/teacher.type'

type Props = {
  item: Teacher
}

const PopoverActions = ({ item }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-1 h-auto rounded-full">
          <IconMoreHorizontal className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-32">
        <Button
          variant="ghost"
          className="justify-start gap-2 w-full"
          onClick={() =>
            dispatch(openModal({ name: 'teacher', type: 'update', data: item }))
          }
        >
          <IconEdit />
          Edit
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-2 w-full text-destructive hover:bg-destructive hover:text-white"
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
      </PopoverContent>
    </Popover>
  )
}

export default PopoverActions
