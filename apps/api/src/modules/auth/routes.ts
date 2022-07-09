import { Router } from 'express'
import { login, refresh, register } from './controllers'
import { loginUserDto } from './dto/login-user.dto'
import { registerUserDto } from './dto/register-user.dto'

const authRouter = Router()

authRouter.post('/register', registerUserDto, register)
authRouter.post('/login', loginUserDto, login)

authRouter.get('/refresh', refresh)

export default authRouter
