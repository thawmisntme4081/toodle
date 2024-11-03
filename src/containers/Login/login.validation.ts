import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
  })
  .required()

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
