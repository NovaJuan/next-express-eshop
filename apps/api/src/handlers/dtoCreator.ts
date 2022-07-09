import { makeValidateBody } from 'express-class-validator'
import HttpError from '../classes/HttpError'

const dtoCreator = (c: any) =>
  makeValidateBody(c, undefined, (error, req, res, next) => {
    return next(new HttpError('Validation error', 400, { error }))
  })

export default dtoCreator
