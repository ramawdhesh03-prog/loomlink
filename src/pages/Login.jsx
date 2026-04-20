import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password!')
      return
    }
    setStatus('loading')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const user = data.user
      const role = user.user_metadata?.role

      if (role === 'manufacturer') navigate('/manufacturer-dashboard')
      else if (role === 'wholesaler') navigate('/wholesaler-dashboard')
      else if (role === 'admin') navigate('/admin')
      else navigate('/')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main style={{ padding: '80px 24px', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{
        background: '#fff', borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)', overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1B3A6B, #2D5AA0)',
          padding: '32px 36px', color: 'white', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔐</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: 0 }}>Login</h1>
          <p style={{ opacity: 0.8, marginTop: '8px', fontSize: '0.95rem' }}>
            Login to your LoomLink account
          </p>
        </div>

        <div style={{ padding: '36px' }}>
          {status === 'error' && (
            <div style={{
              background: '#fff5f5', border: '1px solid #8B1A1A', color: '#8B1A1A',
              padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
              fontWeight: 600, fontSize: '0.9rem'
            }}>
              ❌ Incorrect email or password!
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: '#2D2D2D' }}>
              Email Address
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1.5px solid #ddd', fontSize: '1rem',
                fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: '#2D2D2D' }}>
              Password
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1.5px solid #ddd', fontSize: '1rem',
                fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={handleLogin} disabled={status === 'loading'}
            style={{
              width: '100%', background: status === 'loading' ? '#aaa' : '#1B3A6B',
              color: 'white', border: 'none', padding: '14px',
              borderRadius: '8px', fontSize: '1.05rem', fontWeight: 700,
              fontFamily: "'Mukta', sans-serif", cursor: status === 'loading' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'loading' ? 'Logging in...' : 'Login →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/manufacturer" style={{ color: '#1B3A6B', fontWeight: 600, textDecoration: 'none' }}>
              Manufacturer Register
            </Link>
            {' '}or{' '}
            <Link to="/wholesaler" style={{ color: '#1B3A6B', fontWeight: 600, textDecoration: 'none' }}>
              Wholesaler Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}