import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line
  _next: NextFunction,
) => {
  if (!err) return

  console.error({ ...err })

  let message = err.message || 'Internal server error.'
  let statusCode = err.statusCode || 500
  let metadata = err.metadata

  if (err.code === 'P2002') {
    message = `Fields already in use: ${err.meta.target.join(', ')}`
    statusCode = 400
    metadata = { alreadyInUse: err.meta.target }
  }

  return res.status(statusCode).json({
    success: false,
    error: message,
    metadata,
  })
}

export default errorHandler
