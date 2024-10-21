import _ from 'lodash'

import { Button } from '@/components/ui/button'
import { TypeModalForm } from '@/redux/slices/modal.slice'

type Props = {
  disabled: boolean
  type: TypeModalForm
  reset: () => void
}

const FormActions = ({ disabled, type, reset }: Props) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        type="reset"
        disabled={disabled}
        onClick={reset}
      >
        Reset
      </Button>
      <Button type="submit" disabled={disabled}>
        {_.capitalize(type as string)}
      </Button>
    </div>
  )
}

export default FormActions
