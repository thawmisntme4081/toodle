import { useGetSujectsQuery } from '@/api/_subjectApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconEdit, IconMoreVertical, IconTrash } from '@/icons'

const Subject = () => {
  const { data: subjects, isLoading } = useGetSujectsQuery()
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 mt-4">
      {subjects?.data.map((item, index) => (
        <Card className="p-4" key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
            <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <IconMoreVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-32">
                <Button variant="ghost" className="gap-2 w-full">
                  <IconEdit />
                  Edit
                </Button>
                <Button variant="ghost" className="gap-2 w-full">
                  <IconTrash />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">0</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Subject
