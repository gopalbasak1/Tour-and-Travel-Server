import { z } from 'zod'

const userValidationSchema = z.object({
  name: z.object({
    first: z.string({
      required_error: 'First name must be provided and must be string',
    }),
    last: z.string({
      required_error: 'Last name must be provided and must be string',
    }),
  }),
  age: z
    .number({
      required_error: 'Age must be provided and must be a number',
    })
    .int()
    .positive(),

  email: z
    .string({
      required_error: 'Email must be provided and must be a string',
    })
    .email(),

  photo: z
    .string({
      required_error: 'Photo must be provided and must be a string',
    })
    .optional(),
})

export const UserValidation = {
  userValidationSchema,
}
