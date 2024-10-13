import { z } from 'zod'

export const teacherSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'Please enter the first name')
      .max(50, 'First name must not exceed 50 characters'),
    lastName: z
      .string()
      .min(1, 'Please enter the last name')
      .max(50, 'Last name must not exceed 50 characters'),
    email: z.string().email('Please enter a valid email'),
    phoneNumber: z.string().length(10, 'Phone number must be 10 digits'),
    address: z.string().optional(),
    avatar: z.string().optional(),
    subjects: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .optional(),
    gender: z.boolean(),
    dateOfBirth: z.date().refine(
      (date) => {
        const today = new Date()
        const age = today.getFullYear() - date.getFullYear()
        const monthDiff = today.getMonth() - date.getMonth()
        return (
          age > 18 ||
          (age === 18 && monthDiff > 0) ||
          (age === 18 && monthDiff === 0 && today.getDate() >= date.getDate())
        )
      },
      { message: 'You must be over 18 years old' },
    ),
  })
  .required()
