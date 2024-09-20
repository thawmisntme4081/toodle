import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth.hook'
import { LucideSchool } from '@/icons/LucideSchool'

import { loginSchema } from './login.validation'

const LoginForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    signIn()
    navigate({ to: '/dashboard' })
    console.log(values)
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>
          <div className="text-xl font-bold flex flex-col items-center">
            <LucideSchool />
            SchoolHub
          </div>
        </CardTitle>
        <CardDescription>
          Please sign-in to your account and start the adventure
        </CardDescription>
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormControl>
                <Checkbox />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
