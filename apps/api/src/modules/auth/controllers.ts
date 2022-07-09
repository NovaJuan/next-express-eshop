import { NextFunction, Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import catcher from '../../handlers/asyncErrorCatcher'
import { JWT_ACCESSTOKEN_KEY, JWT_REFRESHTOKEN_KEY } from '../../config/config'
import db from '../../config/db'
import HttpError from '../../classes/HttpError'

export const register = catcher(async (req: Request, res: Response) => {
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
})

export const login = catcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await db.users.findFirst({ where: { email: req.body.email } })

    if (!user) return next(new HttpError('User not found', 404))

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    )

    if (!isPasswordValid) return next(new HttpError('Invalid credentials', 403))

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
  },
)

export const refresh = catcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization ?? ''

    if (!authorization.startsWith('Bearer '))
      return next(new HttpError('Invalid refresh token', 403))

    const token = authorization.replace('Bearer ', '')

    if (!token) return next(new HttpError('Invalid refresh token', 403))

    try {
      jwt.verify(token, JWT_REFRESHTOKEN_KEY)
    } catch (err) {
      return next(new HttpError('Invalid refresh token', 403))
    }

    const payload = jwt.decode(token) as jwt.JwtPayload

    const user = await db.users.findFirst({ where: { id: payload.userId } })

    if (!user) return next(new HttpError('Invalid refresh token', 403))

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
  },
)
