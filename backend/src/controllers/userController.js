import User from '../models/User.js'

// POST /users: add a new user
export async function createUser(req, res, next) {
  try {
    const { name, email } = req.body || {}
    const user = await User.create({ name, email })
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

// GET /users: list users (used by the frontend dropdown)
export async function getUsers(req, res, next) {
  try {
    res.json({ success: true, data: await User.find().sort({ name: 1 }) })
  } catch (err) {
    next(err)
  }
}
