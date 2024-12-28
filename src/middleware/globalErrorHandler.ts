import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { handleGenericError } from '../helpers/handleGenericError'
import { handleDuplicateError } from '../helpers/handleDuplicateError'
import { handleCastError } from '../helpers/handleCastError'
import { handleValidationError } from '../helpers/handleValidationError'
import { handleZodError } from '../helpers/handleZodError'

/**
 * Error:
 * 1. Duplicate - MongoDB unique properties thaka acha
 *
 * 2.validation - value hoba akta dicha ar akta- ex- maxlength-20- dawo hoycha- 22 and minlength-5 -dawo hoycha- 4
 *
 * 3. Cast Error - Type Casting Error- ex- boolean, string, number jata jai hoba ta na diya boolean jaiga string dawoya hoycha
 *
 * 4. Zod Error/ joi
 */

type TErrorResponse = {
  success: boolean
  message: string
  error: any
}

// Global error handler middleware
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res)
  }
  // Handle Mongoose Cast Errors (e.g., invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res)
  }
  // Handle Mongoose Validation Errors (e.g., missing required fields)
  else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res)
  }
  // Handle Duplicate Key Errors (e.g., violating unique constraints in MongoDB)
  else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res)
  }

  // Handle generic JavaScript Errors (any standard Error object)
  else if (err instanceof Error) {
    handleGenericError(err, res)
  }
  //
}
