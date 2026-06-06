import { z } from 'zod'

export const completeOnboardingSchema = z.object({
  teamSize: z.string(),
  currency: z.string().length(3),
})