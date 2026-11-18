import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: [120, 'Title is too long'] },
    content: { type: String, required: [true, 'Content is required'], trim: true },
    // Reference to the User collection: this is the "schema reference"
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required'] },
  },
  { timestamps: true }
)

export default mongoose.model('Post', postSchema)
