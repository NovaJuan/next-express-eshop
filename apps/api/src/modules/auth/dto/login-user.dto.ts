import { IsEmail, IsString } from 'class-validator'
import { makeValidateBody } from 'express-class-validator'

class LoginUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export const loginUserDto = makeValidateBody(LoginUserDto)
