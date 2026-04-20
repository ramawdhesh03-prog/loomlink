import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const ADMIN_EMAIL = 'info@loomlink.in'

export default function AdminDashboard() {
  const [manufacturers, setManufacturers] = useState([])
  const [wholesalers, setWholesalers] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('manufacturers')
  const navigate = useNavigate()

  useEffect(() => { checkAdmin() }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== ADMIN_EMAIL) { navigate('/'); return }
    fetchData()
  }

  const fetchData = async () => {
    const { data: mfgData } = await supabase.from('manufacturers').select('*').order('created_at', { ascending: false })
    const { data: wsData } = await supabase.from('wholesalers').select('*').order('created_at', { ascending: false })
    const { data: msgData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    setManufacturers(mfgData || [])
    setWholesalers(wsData || [])
    setMessages(msgData || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B' }}>Loading...</div>

  const tabStyle = (tab) => ({
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: 600, fontFamily: "'Mukta', sans-serif", fontSize: '0.9rem',
    background: activeTab === tab ? '#1B3A6B' : 'transparent',
    color: activeTab === tab ? 'white' : '#1B3A6B',
    border: '2px solid #1B3A6B', transition: 'all 0.2s'
  })

  return (
    <main style={{ padding: '40px 24px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B, #2D5AA0)',
        borderRadius: '16px', padding: '28px 32px', color: 'white',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>👑</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ opacity: 0.8, marginTop: '4px', fontSize: '0.9rem' }}>LoomLink — Full Control Panel</p>
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(255,255,255,0.2)', color: 'white',
          border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px',
          borderRadius: '8px', cursor: 'pointer', fontFamily: "'Mukta', sans-serif", fontWeight: 600
        }}>Logout</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { num: manufacturers.length, label: 'Total Manufacturers', icon: '🏭', color: '#8B1A1A' },
          { num: wholesalers.length, label: 'Total Wholesalers', icon: '🛍️', color: '#C9A84C' },
          { num: manufacturers.length + wholesalers.length, label: 'Total Users', icon: '👥', color: '#1B3A6B' },
          { num: messages.length, label: 'Total Messages', icon: '✉️', color: '#2D7A4A' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderTop: `4px solid ${stat.color}`, textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, fontFamily: "'Playfair Display', serif" }}>{stat.num}</div>
            <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button style={tabStyle('manufacturers')} onClick={() => setActiveTab('manufacturers')}>🏭 Manufacturers ({manufacturers.length})</button>
        <button style={tabStyle('wholesalers')} onClick={() => setActiveTab('wholesalers')}>🛍️ Wholesalers ({wholesalers.length})</button>
        <button style={tabStyle('messages')} onClick={() => setActiveTab('messages')}>✉️ Messages ({messages.length})</button>
      </div>

      {/* Manufacturers Table */}
      {activeTab === 'manufacturers' && (
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#8B1A1A', color: 'white' }}>
                  {['Name', 'Business', 'City', 'Phone', 'WhatsApp', 'MOQ', 'Price Range', 'Registered'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {manufacturers.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Abhi koi manufacturer registered nahi hai</td></tr>
                ) : manufacturers.map((m, i) => (
                  <tr key={m.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{m.business_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.phone}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>
                      {m.whatsapp && <a href={`https://wa.me/91${m.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}>{m.whatsapp}</a>}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.moq}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.price_range}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Wholesalers Table */}
      {activeTab === 'wholesalers' && (
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#C9A84C', color: '#2D2D2D' }}>
                  {['Name', 'Business', 'City', 'Phone', 'WhatsApp', 'Monthly Req', 'Budget', 'Registered'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wholesalers.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Abhi koi wholesaler registered nahi hai</td></tr>
                ) : wholesalers.map((w, i) => (
                  <tr key={w.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{w.business_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.phone}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>
                      {w.whatsapp && <a href={`https://wa.me/91${w.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}>{w.whatsapp}</a>}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.monthly_requirement}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.budget_range}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(w.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Messages Table */}
      {activeTab === 'messages' && (
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2D7A4A', color: 'white' }}>
                  {['Name', 'Email', 'Phone', 'Message', 'Received'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Abhi koi message nahi aaya</td></tr>
                ) : messages.map((msg, i) => (
                  <tr key={msg.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{msg.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{msg.email || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{msg.phone || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', maxWidth: '300px' }}>{msg.message}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(msg.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}