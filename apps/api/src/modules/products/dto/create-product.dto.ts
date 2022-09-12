import { IsNumber, IsString } from 'class-validator'
import dtoCreator from '../../../handlers/dtoCreator'

export class CreateProductDto {
  @IsString()
  name: string

  @IsNumber()
  price: number
}

export const createProductDto = dtoCreator(CreateProductDto)
