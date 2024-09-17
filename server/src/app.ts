import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import instanceConnect from '@/configs/database.config'

config()

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(helmet())
// connect database
instanceConnect.sequelize?.sync()
// routes

export default app
