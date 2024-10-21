import { z } from 'zod'

const MIN_AGE = 15

export const studentSchema = z
  .object({
    first_name: z
      .string()
      .min(1, 'Please enter the first name')
      .max(50, 'First name must not exceed 50 characters'),
    last_name: z
      .string()
      .min(1, 'Please enter the last name')
      .max(50, 'Last name must not exceed 50 characters'),
    email: z.string().email('Please enter a valid email'),
    phone_number: z
      .string()
      .optional()
      .refine((value) => value === undefined || /^[0-9]{10}$/.test(value), {
        message: 'Phone number must be 10 digits',
      }),
    address: z.string().min(1, 'Please enter the address'),
    avatar: z.string().optional().or(z.literal('')),
    gender: z.boolean({ message: 'Please choose gender' }),
    date_of_birth: z.string().refine(
      (dateString) => {
        const date = new Date(dateString)
        const isValidDate = !isNaN(date.getTime())
        if (!isValidDate) return false

        const today = new Date()
        const age = today.getFullYear() - date.getFullYear()
        const monthDiff = today.getMonth() - date.getMonth()
        const dayDiff = today.getDate() - date.getDate()

        return (
          isValidDate &&
          (age > MIN_AGE ||
            (age === MIN_AGE && monthDiff > 0) ||
            (age === MIN_AGE && monthDiff === 0 && dayDiff >= 0))
        )
      },
      {
        message: 'Date must be valid and age must be more than 15 years.',
      },
    ),
  })
  .required()
