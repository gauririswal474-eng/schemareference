import { useState } from 'react'
import { createPost, errorMessage } from '../api.js'

export default function PostForm({ users, onCreated }) {
  const [form, setForm] = useState({ title: '', content: '', user: '' })
  const [msg, setMsg] = useState(null)
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createPost(form)
      setForm({ title: '', content: '', user: form.user })
      setMsg({ type: 'ok', text: 'Post added!' })
      onCreated()
    } catch (err) {
      setMsg({ type: 'err', text: errorMessage(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add Post</h2>
      <select value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} required>
        <option value="">Select a user</option>
        {users.map((u) => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
      </select>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <textarea rows={3} placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
      <button disabled={saving || users.length === 0}>{saving ? 'Adding...' : 'Add Post'}</button>
      {users.length === 0 && <p className="hint">Add a user first.</p>}
      {msg && <p className={msg.type}>{msg.text}</p>}
    </form>
  )
}
