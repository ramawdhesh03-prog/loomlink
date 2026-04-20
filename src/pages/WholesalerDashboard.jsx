import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function WholesalerDashboard() {
  const [profile, setProfile] = useState(null)
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [activeTab, setActiveTab] = useState('profile')
  const navigate = useNavigate()

  const SAREE_TYPES = [
    'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
    'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
    'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
  ]

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/login'); return }
    const { data: profileData } = await supabase.from('wholesalers').select('*').eq('user_id', user.id).single()
    const { data: mfgData } = await supabase.from('manufacturers').select('*').order('created_at', { ascending: false })
    setProfile(profileData)
    setForm(profileData || {})
    setManufacturers(mfgData || [])
    setLoading(false)
  }

  const handleSave = async () => {
    const { error } = await supabase.from('wholesalers').update({
      name: form.name, business_name: form.business_name, city: form.city,
      whatsapp: form.whatsapp, monthly_requirement: form.monthly_requirement,
      budget_range: form.budget_range, saree_types: form.saree_types,
    }).eq('id', profile.id)
    if (!error) { setProfile(form); setEditing(false) }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const toggleSareeType = type => {
    const current = form.saree_types || []
    setForm(prev => ({
      ...prev,
      saree_types: current.includes(type) ? current.filter(t => t !== type) : [...current, type]
    }))
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B' }}>Loading...</div>

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #ddd', fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
  }

  const tabStyle = (tab) => ({
    padding: '10px 24px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: 600, fontFamily: "'Mukta', sans-serif",
    background: activeTab === tab ? '#1B3A6B' : 'transparent',
    color: activeTab === tab ? 'white' : '#1B3A6B',
    border: '2px solid #1B3A6B', transition: 'all 0.2s'
  })

  return (
    <main style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{
        background: 'linear-gradient(135deg, #C9A84C, #A8873D)',
        borderRadius: '16px', padding: '28px 32px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🛍️</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: 0, color: '#2D2D2D' }}>
            Wholesaler Dashboard
          </h1>
          <p style={{ color: 'rgba(45,45,45,0.7)', marginTop: '4px', fontSize: '0.9rem' }}>
            {profile?.business_name || 'Aapka Business'}
          </p>
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(0,0,0,0.15)', color: '#2D2D2D', border: 'none',
          padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
          fontFamily: "'Mukta', sans-serif", fontWeight: 600
        }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button style={tabStyle('profile')} onClick={() => setActiveTab('profile')}>👤 Mera Profile</button>
        <button style={tabStyle('browse')} onClick={() => setActiveTab('browse')}>🏭 Manufacturers Browse</button>
      </div>

      {activeTab === 'profile' && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", margin: 0 }}>📋 Mera Profile</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={{
                background: '#1B3A6B', color: 'white', border: 'none',
                padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: 600, fontFamily: "'Mukta', sans-serif"
              }}>✏️ Edit</button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleSave} style={{
                  background: '#2D7A4A', color: 'white', border: 'none',
                  padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                  fontWeight: 600, fontFamily: "'Mukta', sans-serif"
                }}>✅ Save</button>
                <button onClick={() => setEditing(false)} style={{
                  background: '#eee', color: '#444', border: 'none',
                  padding: '8px 18px', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: "'Mukta', sans-serif"
                }}>Cancel</button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { label: 'Aapka Naam', key: 'name' },
              { label: 'Business Name', key: 'business_name' },
              { label: 'City', key: 'city' },
              { label: 'WhatsApp', key: 'whatsapp' },
              { label: 'Monthly Requirement', key: 'monthly_requirement' },
              { label: 'Budget Range', key: 'budget_range' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '6px' }}>
                  {field.label}
                </label>
                {editing ? (
                  <input value={form[field.key] || ''} onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))} style={inputStyle} />
                ) : (
                  <div style={{ padding: '10px 14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.95rem' }}>
                    {profile?.[field.key] || '—'}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>
              Preferred Saree Types
            </label>
            {editing ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {SAREE_TYPES.map(type => (
                  <button key={type} onClick={() => toggleSareeType(type)} style={{
                    padding: '6px 16px', borderRadius: '20px',
                    border: `2px solid ${(form.saree_types || []).includes(type) ? '#C9A84C' : '#ddd'}`,
                    background: (form.saree_types || []).includes(type) ? '#C9A84C' : '#fff',
                    color: (form.saree_types || []).includes(type) ? '#2D2D2D' : '#666',
                    cursor: 'pointer', fontFamily: "'Mukta', sans-serif", fontSize: '0.85rem'
                  }}>{type}</button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(profile?.saree_types || []).map(type => (
                  <span key={type} style={{
                    padding: '6px 16px', borderRadius: '20px',
                    background: '#C9A84C', color: '#2D2D2D', fontSize: '0.85rem'
                  }}>{type}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'browse' && (
        <div>
          <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>
            🏭 Verified Manufacturers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {manufacturers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#888', gridColumn: '1/-1' }}>
                Abhi koi manufacturer registered nahi hai.
              </div>
            ) : manufacturers.map(mfg => (
              <div key={mfg.id} style={{
                background: '#fff', borderRadius: '16px', padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: '4px solid #8B1A1A'
              }}>
                <h3 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '4px' }}>
                  {mfg.business_name}
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '12px' }}>📍 {mfg.city}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {(mfg.saree_types || []).slice(0, 3).map(type => (
                    <span key={type} style={{
                      padding: '4px 12px', borderRadius: '20px',
                      background: '#f0f4ff', color: '#1B3A6B', fontSize: '0.8rem', fontWeight: 600
                    }}>{type}</span>
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '16px' }}>
                  <div>📦 MOQ: {mfg.moq || '—'} pieces</div>
                  <div>💰 Price: {mfg.price_range || '—'}</div>
                </div>
                <a href={`https://wa.me/91${mfg.whatsapp || mfg.phone}?text=Hi%20${encodeURIComponent(mfg.business_name)}%2C%20I%20found%20you%20on%20LoomLink`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', background: '#25D366', color: 'white',
                  textAlign: 'center', padding: '10px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
                }}>
                  💬 WhatsApp pe Contact Karo
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}