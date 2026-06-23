import { prisma } from '../../../shared/DATABASE/prisma'
import { createCustomOrderInput } from '../validator/create-order.validator'

export const generateOrderNumber = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const random = Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    '',
  )
  const now = new Date()
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`

  return `AT-${date}-${random}`
}

export const orderRepository = {
  createCustomOrder: async (input: createCustomOrderInput, tenantId: string, createdById: string) => {
    return prisma.order.create({
      data: {
        tenantId,
        createdById,
        orderNumber: generateOrderNumber(),
        orderType: 'CUSTOM_ORDER',
        garmentType: input.garmentType,
        quantity: input.quantity,
        deadline: input.deadline ?? null,
        stageToStart: input.stageToStart,
        description: input.description ?? null,
        status: 'PENDING',
        customOrder: {
          create: {
            clientName: input.clientName,
            clientPhone: input.clientPhone ?? null,
          },
        },
      },
      include: {
        customOrder: true,
      },
    })
  },

  findOrderByIdandTenant: async (orderId: string, tenantId: string) => {
    return prisma.order.findFirst({
      where: { id: orderId, tenantId },
      include: {
        customOrder: true,
        readyToWear: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    })
  },

  findOrderById: async (orderId: string) => {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customOrder: true,
        readyToWear: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    })
  },

  findAllOrderByTenant: async (tenantId: string) => {
    return prisma.order.findMany({
      where: {
        id: tenantId,
      },
      include: {
        customOrder: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },
}
