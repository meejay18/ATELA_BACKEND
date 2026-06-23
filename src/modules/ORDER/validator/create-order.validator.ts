import z from 'zod'
import { ProductionStage } from '@prisma/client'

export const createCustomOrderSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientPhone: z.string().optional(),
  garmentType: z.string().min(1, 'Garment type is required'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  deadline: z.coerce.date().optional(),
  stageToStart: z.nativeEnum(ProductionStage),
  description: z.string().optional(),
})

export type createCustomOrderInput = z.infer<typeof createCustomOrderSchema>
