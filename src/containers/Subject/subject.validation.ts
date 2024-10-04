import { z } from 'zod'

export const subjectSchema = z
  .object({
    name: z.string().max(50, 'Subject name must not exceed 50 characters'),
  })
  .required()
