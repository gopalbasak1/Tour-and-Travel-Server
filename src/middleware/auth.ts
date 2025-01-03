import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import config from '../config'
import User from '../module/user/user.model'
import jwt, { JwtPayload } from 'jsonwebtoken'

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Auth middleware triggered')
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized')
    }

    const decoded = jwt.verify(
      token,
      config.secret_access_token as string
    ) as JwtPayload

    const { email, role } = decoded

    const user = await User.findOne({ email })
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found !!')
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized')
    }

    // Attach the decoded token to the request
    req.user = decoded as JwtPayload

    // Proceed to the next middleware or route handler
    next()

    //
  })
}

export default auth
