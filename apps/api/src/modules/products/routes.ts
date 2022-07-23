import { Router } from 'express'
import { getProducts } from './controllers'

const productsRouter = Router()

productsRouter.get('/', getProducts)

export default productsRouter
