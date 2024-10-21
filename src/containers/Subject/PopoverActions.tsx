import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconEdit, IconMoreVertical, IconTrash } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'

import { Subject } from './subject.type'

type Props = {
  item: Subject
}

const PopoverActions = ({ item }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-1 h-auto rounded-full">
          <IconMoreVertical className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-32">
        <Button
          variant="ghost"
          className="justify-start gap-2 w-full"
          onClick={() =>
            dispatch(openModal({ name: 'subject', type: 'update', data: item }))
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
                name: 'subject',
                type: 'delete',
                data: { name: item.name, id: item.id },
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
