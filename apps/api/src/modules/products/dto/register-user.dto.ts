import { IsEmail, IsString } from 'class-validator'
import dtoCreator from '../../../handlers/dtoCreator'

class RegisterUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export const registerUserDto = dtoCreator(RegisterUserDto)
