import { IsNumber, IsOptional, IsString } from 'class-validator'
import dtoCreator from '../../../handlers/dtoCreator'

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsOptional()
  price?: number
}

export const updateProductDto = dtoCreator(UpdateProductDto)
