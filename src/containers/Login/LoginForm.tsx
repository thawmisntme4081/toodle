import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import { login } from '@/api/login'
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
import { LucideSchool } from '@/icons'

import { loginSchema } from './login.validation'

const LoginForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutation.mutate({ ...values })
    // signIn()
    console.log(mutation)
    // navigate({ to: '/dashboard' })
  }

  return (
    <Card className="w-[500px]">
      <CardHeader className="flex-row gap-2 items-center">
        <LucideSchool width={24} height={24} />
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
                    <Input placeholder="a@gmail.com" {...field} />
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
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
