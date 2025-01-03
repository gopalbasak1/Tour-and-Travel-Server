import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'

//
const register = catchAsync(async (req, res) => {
  const result = await AuthService.registerFromDB(req.body)

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User is registered successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body)
  console.log(result.token)
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User logged in successfully',
    token: result.token,
    data: result.verifiedUser,
  })
})

//
export const AuthController = {
  register,
  login,
}
