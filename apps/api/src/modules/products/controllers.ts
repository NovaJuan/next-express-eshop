import { Request, Response } from 'express'
import catcher from '../../handlers/asyncErrorCatcher'
import db from '../../config/db'

export const getProducts = catcher(async (req: Request, res: Response) => {
  const products = await db.products.findMany()

  return res.json({
    success: true,
    products,
  })
})
