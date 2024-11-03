import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { z } from 'zod'

import { useChangePasswordMutation } from '@/api/_authApi'
import { PasswordInput } from '@/components/custom-ui/password-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ROLES } from '@/enums/roles.enum'
import { RootState } from '@/redux/store'

import { changePasswordSchema } from './login.validation'

const ChangePasswordForm = () => {
  const router = useRouter()
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const data = useSelector((state: RootState) => state.auth)

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    await changePassword({
      userId: data.userId,
      role: data.role as ROLES,
      newPassword: values.confirmPassword,
    }).unwrap()
    router.invalidate()
  }

  return (
    <Card className="w-[500px]">
      <CardHeader className="flex-row gap-2 items-center">
        <CardTitle>Change Your Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      disabled={isLoading}
                      hasSuffix
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      disabled={isLoading}
                      hasSuffix
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Confirm
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordForm
