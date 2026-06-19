'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-dark)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">XeebiHealth</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--teal)' }}>Telehealth Portal</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'var(--card-bg)' }}>
          <h2 className="text-xl font-semibold text-white mb-6">Welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--muted)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 transition"
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--divider)', focusRingColor: 'var(--teal)' }}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--muted)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none transition"
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--divider)' }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-60"
              style={{ background: 'var(--teal)', color: '#0B1828' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center" style={{ color: 'var(--muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" style={{ color: 'var(--teal)' }} className="font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
