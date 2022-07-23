import { IsEmail, IsString } from 'class-validator'
import dtoCreator from '../../../handlers/dtoCreator'

class LoginUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export const loginUserDto = dtoCreator(LoginUserDto)
