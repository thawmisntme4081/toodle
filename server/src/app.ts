import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import routes from '@/routes'
config()
import { query } from '@/configs/database.config'
import { AuthService } from './services/auth.service'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// check database
query('SELECT version()').then((res) => {
  if (res) {
    const [{ version }] = res as any[]
    console.log(version)
  }
})

AuthService.initAdmin()

// routes
app.use('/api', routes)

export default app
