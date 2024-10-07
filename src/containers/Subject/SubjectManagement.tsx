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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'update' | 'delete'>('create')
  const [subjectId, setSubjectId] = useState<string | null>(null)

  const { data: subjects, isLoading } = useGetSujectsQuery()
  const [createSubject, { isLoading: isCreating }] = useCreateSubjectMutation()
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation()
  const [deleteSubject, { isLoading: isDeleting }] = useDeleteSubjectMutation()

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { name: '' },
  })

  if (isLoading) return <div>Loading...</div>

  const openDialogInMode = (
    newMode: 'create' | 'update' | 'delete',
    id: string | null,
  ) => {
    setMode(newMode)
    setDialogOpen(true)
    setSubjectId(id)

    if (newMode == 'update' || (newMode == 'delete' && id)) {
      const subject = subjects?.data.find((item) => item.id === id)
      if (subject) form.setValue('name', subject.name)
    } else {
      form.reset()
    }
  }

  const handleError = (error: any) => {
    const subjectName = error.data.message
      .split('Key (name)=(')[1]
      .split(')')[0]
    toast.error(`Subject ${subjectName} already exists.`)
  }

  const handleFormSubmit = async (value: z.infer<typeof subjectSchema>) => {
    try {
      let response
      if (mode === 'create') {
        response = await createSubject(value)
        form.reset()
      } else if (mode === 'update' && subjectId) {
        response = await updateSubject({
          id: subjectId,
          name: value as unknown as string,
        })
      } else if (mode === 'delete' && subjectId) {
        response = await deleteSubject(subjectId)
      }
      if (!response?.error) {
        toast.success(`Subject ${mode}d successfully`)
      } else {
        handleError(response.error)
      }
      setDialogOpen(false)
    } catch (error) {
      console.error('Failed to create or update subject:', error)
    }
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
              openDialogInMode('create', null)
            }}
          >
            <IconPlus />
            Add Subject
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' && 'Create Subject'}
              {mode === 'update' && 'Update Subject'}
              {mode === 'delete' && 'Delete Subject'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create' && 'Create a new subject here.'}
              {mode === 'update' && 'Edit the subject details here.'}
              {mode === 'delete' &&
                'Are you sure you want to delete this subject?'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-8"
            >
              {mode !== 'delete' && (
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
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating || isDeleting}
                >
                  {mode === 'create' && 'Create Subject'}
                  {mode === 'update' && 'Save changes'}
                  {mode === 'delete' && 'Delete Subject'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {subjects?.data.length == 0
          ? 'No Subject Found'
          : subjects?.data.map((item) => (
              <Card className="p-4" key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
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
                        onClick={() => openDialogInMode('update', item.id)}
                      >
                        <IconEdit />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2 w-full"
                        onClick={() => openDialogInMode('delete', item.id)}
                      >
                        <IconTrash />
                        Delete
                      </Button>
                    </PopoverContent>
                  </Popover>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-xl font-bold">
                    {item.number_of_teachers == 1
                      ? `${item.number_of_teachers} Teacher`
                      : `${item.number_of_teachers} Teachers`}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  )
}

export default SubjectManagement
