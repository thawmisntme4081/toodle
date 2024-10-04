import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { useLoginMutation } from '@/api/_authApi'
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
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth.hook'
import { IconSchool } from '@/icons'

import { loginSchema } from './login.validation'

const LoginForm = () => {
  const router = useRouter()
  const navigate = useNavigate()
  const auth = useAuth()
  const [login, { isLoading }] = useLoginMutation()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const loginRes = await login(values)
      if (loginRes.error) {
        const error = loginRes.error as any
        toast.error(error.data.message as string)
        return
      }
      auth.signIn()
      router.invalidate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader className="flex-row gap-2 items-center">
        <IconSchool width={24} height={24} />
        <CardTitle>SchoolHub</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="a@gmail.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
            <div className="flex justify-end">
              <a href="" className="text-primary">
                Forgot password?
              </a>
            </div>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
