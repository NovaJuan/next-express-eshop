import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config'
import { authRouter } from './modules/auth'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.listen(PORT, () => console.info(`Server Running on port ${PORT}`))
