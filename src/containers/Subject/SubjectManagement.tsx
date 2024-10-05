import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useGetSujectsQuery,
  useUpdateSubjectMutation,
} from '@/api/_subjectApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconEdit, IconMoreVertical, IconPlus, IconTrash } from '@/icons'

import { subjectSchema } from './subject.validation'

const SubjectManagement = () => {
  const { data: subjects, isLoading } = useGetSujectsQuery()
  const [createSubject, { isLoading: isCreating }] = useCreateSubjectMutation()
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation()
  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [currentSubjectId, setCurrentSubjectId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: '',
    },
  })

  if (isLoading) return <div>No subject found</div>

  const handleError = (error: any) => {
    const subjectName = error.data.message
      .split('Key (name)=(')[1]
      .split(')')[0]
    toast.error(`Subject ${subjectName} already exists.`)
  }

  const modifySubject = async (value: z.infer<typeof subjectSchema>) => {
    try {
      let response
      if (isEditMode && currentSubjectId) {
        response = await updateSubject({
          id: currentSubjectId,
          name: value as unknown as string,
        })
      } else {
        response = await createSubject(value)
      }

      if (response?.error) {
        handleError(response.error)
        return
      }
      setDialogOpen(false)
      setEditMode(false)
      setCurrentSubjectId(null)
    } catch (error) {
      console.error('Failed to create or update subject:', error)
    }
  }

  const handleEditSubject = (id: string) => {
    const subject = subjects?.data.find((item) => item.id === id)
    if (!subject) return

    form.setValue('name', subject.name)
    setCurrentSubjectId(id)
    setEditMode(true)
    setDialogOpen(true)
  }
  const handleDeleteSubject = async (id: string) => {
    await deleteSubject(id)
    toast.success('Subject deleted successfully')
  }

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen)
          if (!isOpen) {
            form.reset()
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 my-4"
            onClick={() => {
              form.reset()
            }}
          >
            <IconPlus />
            Add Subject
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Subject' : 'Add Subject'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Edit the subject details'
                : 'Create a Subject here'}
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(modifySubject)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mathematics"
                          {...field}
                          disabled={isCreating || isUpdating}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isCreating || isUpdating}>
                  Save changes
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {subjects?.data.map((item) => (
          <Card className="p-4" key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <IconMoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-32">
                  <Button
                    variant="ghost"
                    className="gap-2 w-full"
                    onClick={() => handleEditSubject(item.id)}
                    disabled={isUpdating}
                  >
                    <IconEdit />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="gap-2 w-full"
                    onClick={() => handleDeleteSubject(item.id)}
                    disabled={isDeleting}
                  >
                    <IconTrash />
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default SubjectManagement
