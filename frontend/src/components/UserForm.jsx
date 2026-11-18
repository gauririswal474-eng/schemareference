import { useState } from 'react'
import { createUser, errorMessage } from '../api.js'

export default function UserForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [msg, setMsg] = useState(null) // { type: 'ok' | 'err', text }
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createUser(form)
      setForm({ name: '', email: '' })
      setMsg({ type: 'ok', text: 'User added!' })
      onCreated()
    } catch (err) {
      setMsg({ type: 'err', text: errorMessage(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add User</h2>
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <button disabled={saving}>{saving ? 'Adding...' : 'Add User'}</button>
      {msg && <p className={msg.type}>{msg.text}</p>}
    </form>
  )
}
