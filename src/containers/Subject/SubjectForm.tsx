import ControlledFormField from '@/components/custom-ui/Form/ControlledFormField'
import FormActions from '@/components/custom-ui/Form/FormActions'
import { Form } from '@/components/ui/form'
import { TypeModalForm } from '@/redux/slices/modal.slice'

import { subjectSchema } from './subject.validation'
import { useSubjectForm } from './useSubjectForm.hook'

type Props = {
  type: TypeModalForm
}

const SubjectForm = ({ type }: Props) => {
  const { form, onSubmit, disabled } = useSubjectForm(type)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ControlledFormField
          control={form.control}
          name="name"
          schema={subjectSchema}
          customName="Subject name"
          inputProps={{ placeholder: 'Subject name', disabled }}
        />
        <FormActions
          disabled={disabled}
          type={type}
          reset={() => form.reset()}
        />
      </form>
    </Form>
  )
}

export default SubjectForm
