import { z } from 'zod'

export const classSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter the class name')
    .max(20, 'Class name must not exceed 20 characters'),
  capacity: z
    .number()
    .int()
    .min(1, 'Please enter the capacity')
    .max(50, 'Capacity must not exceed 50'),
  grade_id: z.string().min(1, 'Please select the grade'),
})
