import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, 'Password must contain at least 6 characters'),
  })
  .required()
