import z from 'zod'

export const createWorkspaceSchema = z.object({
  factoryName: z.string().min(2, "Factory name must be at least 2 characters"),
  currency: z.string().length(3, "Currency must be a 3-letter ISO code"),
  teamSize: z.number().min(1, "Team size must be at least 1"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});



