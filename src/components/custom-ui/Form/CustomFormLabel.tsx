import _ from 'lodash'
import { ZodObject } from 'zod'

import { FormLabel, useFormField } from '@/components/ui/form'

type Props<T> = {
  schema: T
  customName?: string
}

const CustomFormLabel = <T extends ZodObject<any>>({
  schema,
  customName,
}: Props<T>) => {
  const { name } = useFormField()

  const isOptional = schema.shape[name].isOptional()

  return (
    <FormLabel>
      {customName ?? _.capitalize(_.replace(name, /_/g, ' '))}{' '}
      {!isOptional && <span className="text-destructive">*</span>}
    </FormLabel>
  )
}

export default CustomFormLabel
