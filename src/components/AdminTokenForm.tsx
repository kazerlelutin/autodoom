import { useState } from 'react'
import { LS_ADMIN_TOKEN } from '@/lib/client-constants'

export function AdminTokenForm() {
  const [token, setToken] = useState(localStorage.getItem(LS_ADMIN_TOKEN) || '')

  return (
    <input
      className="input"
      placeholder="Admin token"
      type="password"
      value={token}
      onChange={(e) => {
        localStorage.setItem(LS_ADMIN_TOKEN, e.target.value)
        setToken(e.target.value)
      }}
    />
  )
}
