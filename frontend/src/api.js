import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', timeout: 15000 })

export function errorMessage(err) {
  if (err.response) return err.response.data?.message || `Request failed (${err.response.status})`
  if (err.request) return 'Cannot reach the server. Please try again.'
  return err.message
}

export const getUsers = () => api.get('/users').then((r) => r.data.data)
export const createUser = (user) => api.post('/users', user).then((r) => r.data.data)
export const getPosts = () => api.get('/posts').then((r) => r.data.data)
export const createPost = (post) => api.post('/posts', post).then((r) => r.data.data)
