import mongoose from 'mongoose'
import Post from '../models/Post.js'
import User from '../models/User.js'
import AppError from '../middleware/AppError.js'

// POST /posts: add a new post linked to a user
export async function createPost(req, res, next) {
  try {
    const { title, content, user } = req.body || {}
    if (!user || !mongoose.isValidObjectId(user)) throw new AppError('A valid user id is required', 400)
    if (!(await User.exists({ _id: user }))) throw new AppError('User not found', 404)

    const post = await Post.create({ title, content, user })
    await post.populate('user', 'name email')
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    next(err)
  }
}

// GET /posts: all posts with the referenced user's information (populate)
export async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json({ success: true, count: posts.length, data: posts })
  } catch (err) {
    next(err)
  }
}
