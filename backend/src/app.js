import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || true }))
app.use(express.json())

app.get('/', (req, res) => res.json({ success: true, message: 'Schema Reference API is running' }))
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
