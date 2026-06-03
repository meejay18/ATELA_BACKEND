import z from 'zod'

export const createWorkspaceSchema = z.object({
  factoryName: z.string().min(2),
  currency: z.string().length(3),
  teamSize: z.number().min(1),
  email: z.string().email(), 
  password: z.string().min(6),
})
