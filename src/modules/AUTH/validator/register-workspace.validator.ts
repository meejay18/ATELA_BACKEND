import z from 'zod'

export const createWorkspaceSchema = z
  .object({
    factoryName: z.string().min(2, 'Factory name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address').toLowerCase(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    teamSize: z.number().min(1, 'Team size must be at least 1').max(1000, 'Team size cannot exceed 1000'),
    currency: z.enum(['USD', 'EUR', 'GBP', 'NGN'], {
      error: () => ({ message: 'Invalid currency' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>
