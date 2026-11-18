import 'dotenv/config'
import mongoose from 'mongoose'
import app from './src/app.js'

const PORT = process.env.PORT || 5000

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

// Connect to MongoDB with Mongoose, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
