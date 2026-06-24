import { NotFoundError } from '../../../shared/ERRORS/not-found-error'
import { eventBus } from '../../../shared/EVENTS/events-bus'
import { ORDER_EVENTS } from '../../../shared/EVENTS/order/order.events'
import { logger } from '../../../shared/LOGGER'
import { orderRepository } from '../repository/order.repository'
import { createCustomOrderResponse } from '../types'
import { createCustomOrderInput } from '../validator/create-order.validator'

export const createCustomOrderService = async (
  input: createCustomOrderInput,
  tenantId: string,
  createdById: string,
): Promise<createCustomOrderResponse> => {
  const order = await orderRepository.createCustomOrder(input, tenantId, createdById)

  const customOrder = order.customOrder
  if (!customOrder) {
    throw new NotFoundError('Custom Order Not Found')
  }

  eventBus.emit(ORDER_EVENTS.CUSTOM_ORDER_CREATED, {
    orderId: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    clientName: order.customOrder?.clientName,
    garmentType: order.garmentType,
    quantity: order.quantity,
    deadline: order.deadline,
    stageToStart: order.stageToStart,
  })

  logger.info(
    {
      orderId: order.id,
      orderNumber: order.orderNumber,
      tenantId,
    },
    'Custom Order Created',
  )
  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    clientName: customOrder.clientName,
    garmentType: order.garmentType,
    quantity: order.quantity,
    deadline: order.deadline,
    stageToStart: order.stageToStart,
    createdAt: order.createdAt,
  }
}
