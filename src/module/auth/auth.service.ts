import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const registerFromDB = async (payload: IUser) => {
  const result = await User.create(payload)

  return result
}

const login = async (payload: ILoginUser) => {
  //
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found !')
  }

  const userStatus = user?.userStatus

  if (userStatus === 'inactive') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is not active !!!')
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect password!!')
  }

  const token = jwt.sign(
    { email: user?.email, role: user?.role },
    config.secret_access_token as string,
    {
      expiresIn: config.secret_access_expires_in,
    }
  )

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }

  return { token, verifiedUser }

  //
}

export const AuthService = {
  registerFromDB,
  login,
}
