import { IsEmail, IsString } from 'class-validator'
import { makeValidateBody } from 'express-class-validator'

class RegisterUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export const registerUserDto = makeValidateBody(RegisterUserDto)
