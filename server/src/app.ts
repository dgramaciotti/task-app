import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import v1Routes from './api/v1/routes/tasks.routes'

const app = express()

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// v1
app.use('/api/v1', v1Routes)

// Root route
app.get('/', (_req, res) => {
  res.json({ message: 'API is running.' })
})

export default app
