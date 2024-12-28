/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import bookingRouter from './module/booking/booking.route'
import tourRouter from './module/tour/tour.route'
import userRouter from './module/user/user.router'
import { globalErrorHandler } from './middleware/globalErrorHandler'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(globalErrorHandler)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  })
})

export default app
