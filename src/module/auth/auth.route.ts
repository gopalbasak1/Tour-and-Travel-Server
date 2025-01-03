import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middleware/validateRequrest'
import { UserValidation } from '../user/user.validation'
import { AuthValidation } from './auth.validation'

const authRouter = express.Router()

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.register
)

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
)

export default authRouter
