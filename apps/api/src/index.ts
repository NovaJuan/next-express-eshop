import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config'
import errorHandler from './handlers/errorHandler'
import { authRouter } from './modules/auth'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(PORT, () => console.info(`Server Running on port ${PORT}`))

process.on('unhandledRejection', (err: any) => {
  console.error(err.stack)
  process.exit(1)
})
