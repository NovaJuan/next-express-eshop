import { NextFunction, Request, Response } from 'express'

const asyncErrorCatcher =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch((e) => next(e))

export default asyncErrorCatcher
