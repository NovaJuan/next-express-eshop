import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from './controllers'
import { createProductDto } from './dto/create-product.dto'
import { updateProductDto } from './dto/update-product.dto'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.post('/', createProductDto, createProduct)

productsRouter.get('/:id', getSingleProduct)
productsRouter.patch('/:id', updateProductDto, updateProduct)
productsRouter.delete('/:id', deleteProduct)

export default productsRouter
