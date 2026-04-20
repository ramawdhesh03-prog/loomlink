import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function ManufacturerDashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const SAREE_TYPES = [
    'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
    'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
    'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/login'); return }

    const { data } = await supabase
      .from('manufacturers')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(data)
    setForm(data || {})
    setLoading(false)
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from('manufacturers')
      .update({
        name: form.name,
        business_name: form.business_name,
        city: form.city,
        whatsapp: form.whatsapp,
        moq: form.moq,
        price_range: form.price_range,
        saree_types: form.saree_types,
      })
      .eq('id', profile.id)

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
      saree_types: current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    }))
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B', fontSize: '1.2rem' }}>
      Loading...
    </div>
  )

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #ddd', fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
  }

  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8B1A1A, #6B1414)',
        borderRadius: '16px', padding: '28px 32px',
        color: 'white', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🏭</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: 0 }}>
            Manufacturer Dashboard
          </h1>
          <p style={{ opacity: 0.8, marginTop: '4px', fontSize: '0.9rem' }}>
            {profile?.business_name || 'Aapka Business'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px',
              borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
              fontFamily: "'Mukta', sans-serif"
            }}>
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={{
                background: '#2D7A4A', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: 600, fontFamily: "'Mukta', sans-serif"
              }}>
                ✅ Save
              </button>
              <button onClick={() => setEditing(false)} style={{
                background: 'rgba(255,255,255,0.2)', color: 'white',
                border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px',
                borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
                fontFamily: "'Mukta', sans-serif"
              }}>
                Cancel
              </button>
            </>
          )}
          <button onClick={handleLogout} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px',
            borderRadius: '8px', cursor: 'pointer', fontFamily: "'Mukta', sans-serif"
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px' }}>
          📋 Mera Profile
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { label: 'Aapka Naam', key: 'name' },
            { label: 'Business Name', key: 'business_name' },
            { label: 'City', key: 'city' },
            { label: 'WhatsApp', key: 'whatsapp' },
            { label: 'Min Order Qty', key: 'moq' },
            { label: 'Price Range', key: 'price_range' },
          ].map(field => (
            <div key={field.key}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '6px' }}>
                {field.label}
              </label>
              {editing ? (
                <input
                  value={form[field.key] || ''}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={inputStyle}
                />
              ) : (
                <div style={{ padding: '10px 14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.95rem', color: '#2D2D2D' }}>
                  {profile?.[field.key] || '—'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Saree Types */}
        <div style={{ marginTop: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>
            Saree Types
          </label>
          {editing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {SAREE_TYPES.map(type => (
                <button key={type} onClick={() => toggleSareeType(type)} style={{
                  padding: '6px 16px', borderRadius: '20px',
                  border: `2px solid ${(form.saree_types || []).includes(type) ? '#8B1A1A' : '#ddd'}`,
                  background: (form.saree_types || []).includes(type) ? '#8B1A1A' : '#fff',
                  color: (form.saree_types || []).includes(type) ? 'white' : '#666',
                  cursor: 'pointer', fontFamily: "'Mukta', sans-serif", fontSize: '0.85rem'
                }}>{type}</button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(profile?.saree_types || []).map(type => (
                <span key={type} style={{
                  padding: '6px 16px', borderRadius: '20px',
                  background: '#8B1A1A', color: 'white', fontSize: '0.85rem'
                }}>{type}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}