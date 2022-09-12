import { Request, Response } from 'express'
import catcher from '../../handlers/asyncErrorCatcher'
import db from '../../config/db'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

export const getProducts = catcher(async (req: Request, res: Response) => {
  const products = await db.products.findMany()

  return res.json({
    success: true,
    products,
  })
})

export const getSingleProduct = catcher(
  async (req: Request<{ id: string }>, res: Response) => {
    const product = await db.products.findUnique({
      where: { id: parseInt(req.params.id) },
      rejectOnNotFound: true,
    })

    return res.status(200).json({
      success: true,
      product,
    })
  },
)

export const createProduct = catcher(
  async (req: Request<any, any, CreateProductDto>, res: Response) => {
    const product = await db.products.create({
      data: { ...req.body, seller_id: 1 },
    })

    return res.status(201).json({
      success: true,
      product,
    })
  },
)

export const updateProduct = catcher(
  async (
    req: Request<{ id: string }, any, UpdateProductDto>,
    res: Response,
  ) => {
    const product = await db.products.update({
      data: { ...req.body },
      where: { id: parseInt(req.params.id) },
    })

    return res.status(200).json({
      success: true,
      product,
    })
  },
)

export const deleteProduct = catcher(
  async (req: Request<{ id: string }>, res: Response) => {
    const product = await db.products.delete({
      where: { id: parseInt(req.params.id) },
    })

    return res.status(200).json({
      success: true,
      product: { deleted: true, ...product },
    })
  },
)
