import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { errorHandler } from '../shared/MIDDLEWARE/error-handler'
import { httpLogger } from '../shared/LOGGER/http'
import { notFoundHandler } from '../shared/ERRORS/not-found-error'
import { authRoutes } from '../modules/AUTH/routes/auth.routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../shared/CONFIG/swagger'
import { Request, Response } from 'express'
import { orderRoutes } from '../modules/ORDER/routes/order.routes'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: '*',
  }),
)
app.use(httpLogger)
app.use(compression())
app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/order', orderRoutes)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Atela API up and running',
  })
})

app.use(notFoundHandler)
app.use(errorHandler)
