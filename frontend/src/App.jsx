import { useState, useEffect, useCallback } from 'react'
import { getUsers, getPosts, errorMessage } from './api.js'
import UserForm from './components/UserForm.jsx'
import PostForm from './components/PostForm.jsx'

export default function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const [u, p] = await Promise.all([getUsers(), getPosts()])
      setUsers(u)
      setPosts(p)
      setError('')
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div className="container">
      <h1>Users and Posts</h1>
      <div className="forms">
        <UserForm onCreated={load} />
        <PostForm users={users} onCreated={load} />
      </div>

      <h2>All Posts</h2>
      {error && <div className="error">{error} <button onClick={load}>Retry</button></div>}
      {loading ? <p>Loading...</p> : posts.length === 0 ? <p className="hint">No posts yet.</p> : (
        <div className="posts">
          {posts.map((post) => (
            <article className="card" key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By <strong>{post.user?.name || 'Unknown user'}</strong>{post.user?.email && ` (${post.user.email})`} · {new Date(post.createdAt).toLocaleString()}</small>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
