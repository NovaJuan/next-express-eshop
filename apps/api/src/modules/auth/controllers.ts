import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_ACCESSTOKEN_KEY, JWT_REFRESHTOKEN_KEY } from '../../config/config'
import db from '../../config/db'

export const register = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  const user = await db.users.create({
    data: { ...req.body, password },
  })

  delete user.password

  return res.status(201).json({
    success: true,
    user,
  })
}

export const login = async (req: Request, res: Response) => {
  const user = await db.users.findFirst({ where: { email: req.body.email } })

  if (!user) {
    return res.status(403).json({
      success: false,
      message: `Invalid Credentials.`,
    })
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

  if (!isPasswordValid) {
    return res.status(403).json({
      success: false,
      message: `Invalid Credentials.`,
    })
  }

  const accessToken = jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    JWT_ACCESSTOKEN_KEY,
    { expiresIn: '10m' },
  )

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    JWT_REFRESHTOKEN_KEY,
    { expiresIn: '7 days' },
  )

  delete user.password

  return res.status(201).json({
    success: true,
    user,
    accessToken,
    refreshToken,
  })
}

export const refresh = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization ?? ''

  if (!authorization.startsWith('Bearer ')) {
    return res.status(403).json({
      success: false,
      message: `Invalid refresh token.`,
    })
  }

  const token = authorization.replace('Bearer ', '')

  if (!token) {
    return res.status(403).json({
      success: false,
      message: `Invalid refresh token.`,
    })
  }

  try {
    jwt.verify(token, JWT_REFRESHTOKEN_KEY)
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: `Invalid refresh token.`,
    })
  }

  const payload = jwt.decode(token) as jwt.JwtPayload

  const user = await db.users.findFirst({ where: { id: payload.userId } })

  if (!user) {
    return res.status(403).json({
      success: false,
      message: `Invalid refresh token.`,
    })
  }

  const accessToken = jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    JWT_ACCESSTOKEN_KEY,
    { expiresIn: '1h' },
  )

  delete user.password

  return res.status(201).json({
    success: true,
    accessToken,
  })
}
