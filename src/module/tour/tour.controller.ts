import { Request, Response } from 'express'
import { tourService } from './tour.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createTour = catchAsync(async (req, res) => {
  const body = req.body
  const result = await tourService.createTour(body)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Tour create successfully',
    data: result,
  })
})

const getTours = catchAsync(async (req, res) => {
  const result = await tourService.getTours(req.query)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'All Tour retrieved successfully',
    data: result,
  })
})

const getSingleTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await tourService.getSingleTour(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour retrieved successfully',
    data: result,
  })
})

const updateTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await tourService.updateTour(id, body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour updated successfully',
    data: result,
  })
})

const deleteTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await tourService.deleteTour(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour deleted successfully',
    data: result,
  })
})

//
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getNextSchedule(id)

    res.send({
      success: true,
      message: 'Tour deleted successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
