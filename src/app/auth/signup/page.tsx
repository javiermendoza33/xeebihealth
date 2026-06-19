'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'patient' | 'doctor'>('patient')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role } },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, full_name: name, role, email })
    }
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-dark)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">XeebiHealth</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--teal)' }}>Telehealth Portal</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: 'var(--card-bg)' }}>
          <h2 className="text-xl font-semibold text-white mb-6">Create your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--muted)' }}>Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--divider)' }}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--muted)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--divider)' }}
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
                minLength={8}
                className="w-full rounded-lg px-4 py-2.5 text-white text-sm outline-none"
                style={{ background: 'var(--bg-dark)', border: '1px solid var(--divider)' }}
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--muted)' }}>I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {(['patient', 'doctor'] as const).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className="rounded-lg py-2.5 text-sm font-medium capitalize transition"
                    style={{
                      background: role === r ? 'var(--teal-dim)' : 'var(--bg-dark)',
                      border: `1px solid ${role === r ? 'var(--teal)' : 'var(--divider)'}`,
                      color: role === r ? 'var(--teal)' : 'var(--muted)',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-60"
              style={{ background: 'var(--teal)', color: '#0B1828' }}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--teal)' }} className="font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
