import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'

config()
const app = express()

// middlewares
app.use(morgan('dev'))
app.use(helmet())
// connect database

// routes

export default app
