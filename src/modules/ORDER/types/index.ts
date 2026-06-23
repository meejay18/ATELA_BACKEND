export interface createCustomOrderResponse {
  orderId: string
  orderNumber: string
  status: string
  clientName: string
  garmentType: string
  quantity: number
  stageToStart: string
  deadline: Date | null
  createdAt: Date
}
