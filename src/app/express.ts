import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { errorHandler } from '../shared/MIDDLEWARE/error-handler'
import { httpLogger } from '../shared/LOGGER/http'
import {  notFoundHandler } from '../shared/ERRORS/not-found-error'

export const app = express()

app.use(helmet())
app.use(cors())
app.use(httpLogger)
app.use(compression())
app.use(cookieParser())
app.use(express.json())

app.get('/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Atela API up and running',
  })
})

app.use(notFoundHandler)
app.use(errorHandler)
