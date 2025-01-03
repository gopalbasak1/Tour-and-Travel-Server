import { NextFunction, Request, Response, Router } from 'express'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constant'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequrest'

const userRouter = Router()

userRouter.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser
)
//

userRouter.get('/:userId', UserController.getSingleUser)
userRouter.put('/:userId', UserController.updateUser)
userRouter.delete('/:userId', UserController.deleteUser)
//
userRouter.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserController.getUser
)

export default userRouter
