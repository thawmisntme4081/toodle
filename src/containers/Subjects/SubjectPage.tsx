import _ from 'lodash'

import { useGetSubjectsQuery } from '@/api/_subjectApi'
import Loading from '@/components/custom-ui/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconPlus } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'

import PopoverActions from './PopoverActions'

const SubjectPage = () => {
  const dispatch = useAppDispatch()

  const { data: subjects, isLoading } = useGetSubjectsQuery()

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4">
        <Button
          className="gap-2"
          onClick={() => dispatch(openModal({ name: 'subject', type: 'add' }))}
        >
          <IconPlus />
          Add Subject
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {!subjects || _.isEmpty(subjects?.data) ? (
          <p>No Subject Found</p>
        ) : (
          subjects.data.map((item) => (
            <Card className="p-4" key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                <PopoverActions item={item} />
              </CardHeader>
              <CardContent className="p-0">
                <span className="text-sm">
                  {item.number_of_teachers === 1
                    ? `${item.number_of_teachers} Teacher`
                    : `${item.number_of_teachers} Teachers`}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default SubjectPage
