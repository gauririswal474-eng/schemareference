import AppError from './AppError.js'

export const notFound = (req, res, next) =>
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404))

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500
  let message = err.message

  if (err.name === 'ValidationError') {
    status = 400
    message = Object.values(err.errors).map((e) => e.message).join(', ')
  } else if (err.code === 11000) {
    status = 409
    message = 'A user with this email already exists'
  } else if (err.type === 'entity.parse.failed') {
    status = 400
    message = 'Invalid JSON in request body'
  }

  if (status === 500) console.error(err)
  res.status(status).json({ success: false, message })
}
