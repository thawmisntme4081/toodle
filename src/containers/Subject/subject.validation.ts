import { z } from 'zod'

export const subjectSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Please enter the Subject name')
      .max(50, 'Subject name must not exceed 50 characters'),
  })
  .required()
