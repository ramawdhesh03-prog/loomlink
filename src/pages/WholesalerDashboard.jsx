import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import PlaceOrderModal from '../components/PlaceOrderModal'

export default function WholesalerDashboard() {
  const [profile, setProfile] = useState(null)
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedMfg, setSelectedMfg] = useState(null)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  const SAREE_TYPES = [
    'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
    'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
    'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
  ]

  const STATUS_CONFIG = {
    pending:   { label: 'Pending',   color: '#E8821A', bg: '#fff8f0' },
    confirmed: { label: 'Confirmed', color: '#1B3A6B', bg: '#f0f4ff' },
    shipped:   { label: 'Shipped',   color: '#7B1FA2', bg: '#f8f0ff' },
    delivered: { label: 'Delivered', color: '#2D7A4A', bg: '#eef9ee' },
    cancelled: { label: 'Cancelled', color: '#D32F2F', bg: '#fff0f0' },
  }

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/login'); return }
    const { data: profileData } = await supabase.from('wholesalers').select('*').eq('user_id', user.id).single()
    const { data: mfgData } = await supabase.from('manufacturers').select('*').order('created_at', { ascending: false })
    setProfile(profileData)
    setForm(profileData || {})
    setManufacturers(mfgData || [])
    fetchOrders(user.id)
    setLoading(false)
  }

  const fetchOrders = async (userId) => {
    const { data, error } = await supabase
      .from('orders_detailed')
      .select('*')
      .eq('wholesaler_id', userId)
      .order('created_at', { ascending: false })
    if (!error) setOrders(data || [])
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

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

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

  const activeOrdersCount = orders.filter(o => ['pending', 'confirmed', 'shipped'].includes(o.status)).length

  return (
    <main style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
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

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Orders', value: orders.length, icon: '📦' },
          { label: 'Active Orders', value: activeOrdersCount, icon: '🔄' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: '✅' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
          }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1B3A6B', fontFamily: "'Playfair Display', serif" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button style={tabStyle('profile')} onClick={() => setActiveTab('profile')}>👤 Mera Profile</button>
        <button style={tabStyle('orders')} onClick={() => setActiveTab('orders')}>
          📦 Mere Orders {activeOrdersCount > 0 && (
            <span style={{
              background: '#E8821A', color: 'white', borderRadius: '50%',
              padding: '1px 7px', fontSize: '0.75rem', marginLeft: '6px'
            }}>{activeOrdersCount}</span>
          )}
        </button>
        <button style={tabStyle('browse')} onClick={() => setActiveTab('browse')}>🏭 Manufacturers</button>
      </div>

      {/* PROFILE TAB */}
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px' }}>📦 Mere Orders</h2>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa', fontFamily: "'Mukta', sans-serif" }}>
              Abhi koi order nahi diya hai। Manufacturers tab se order place karo!
            </div>
          ) : orders.map(order => (
            <div key={order.id} style={{
              border: '1.5px solid #f0f0f0', borderRadius: '12px',
              padding: '20px', marginBottom: '16px',
              borderLeft: `4px solid ${STATUS_CONFIG[order.status]?.color}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1B3A6B', fontFamily: "'Playfair Display', serif" }}>
                    {order.manufacturer_business || 'Manufacturer'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>
                    📅 {formatDate(order.created_at)}
                  </div>
                </div>
                <span style={{
                  padding: '4px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700,
                  color: STATUS_CONFIG[order.status]?.color,
                  background: STATUS_CONFIG[order.status]?.bg,
                }}>
                  {STATUS_CONFIG[order.status]?.label}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Saree Type', value: order.saree_type },
                  { label: 'Quantity', value: `${order.quantity} pcs` },
                  { label: 'Price/Piece', value: `₹${order.price_per_piece}` },
                  { label: 'Total', value: `₹${order.total_amount}` },
                ].map(item => (
                  <div key={item.label} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '10px 14px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: '#2D2D2D', fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {order.notes && (
                <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fffbf0', borderRadius: '8px', fontSize: '0.85rem', color: '#666' }}>
                  📝 {order.notes}
                </div>
              )}

              {order.manufacturer_whatsapp && (
                <a href={`https://wa.me/91${order.manufacturer_whatsapp}?text=Hi%2C%20mera%20order%20LoomLink%20pe%20hai%2C%20status%20kya%20hai%3F`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', marginTop: '12px',
                    background: '#25D366', color: 'white',
                    padding: '8px 16px', borderRadius: '8px',
                    textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600
                  }}>
                  💬 Manufacturer se poocho
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BROWSE TAB */}
      {activeTab === 'browse' && (
        <div>
          <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>
            🏭 Verified Manufacturers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {manufacturers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#888', gridColumn: '1/-1' }}>
                Abhi koi manufacturer registered nahi hai।
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
                <a href={`https://wa.me/91${mfg.whatsapp || mfg.phone}?text=Hi%20${encodeURIComponent(mfg.business_name)}%2C%20I%20found%20you%20on%20LoomLink`}
                  target="_blank" rel="noopener noreferrer" style={{
                    display: 'block', background: '#25D366', color: 'white',
                    textAlign: 'center', padding: '10px', borderRadius: '8px',
                    textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
                  }}>
                  💬 WhatsApp pe Contact Karo
                </a>
                <button
                  onClick={() => setSelectedMfg(mfg)}
                  style={{
                    display: 'block', width: '100%',
                    background: '#1B3A6B', color: 'white',
                    textAlign: 'center', padding: '10px', borderRadius: '8px',
                    border: 'none', fontWeight: 600, fontSize: '0.9rem',
                    cursor: 'pointer', marginTop: '8px',
                    fontFamily: "'Mukta', sans-serif"
                  }}
                >
                  📦 Order Place Karo
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMfg && (
        <PlaceOrderModal
          manufacturer={selectedMfg}
          onClose={() => setSelectedMfg(null)}
          onSuccess={() => {
            setSelectedMfg(null)
            setOrderSuccess(true)
            fetchOrders(null)
            setTimeout(() => setOrderSuccess(false), 3000)
          }}
        />
      )}

      {orderSuccess && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: '#2D7A4A', color: '#fff',
          padding: '14px 22px', borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 9999, fontFamily: "'Mukta', sans-serif",
          fontWeight: 600, fontSize: '0.95rem'
        }}>
          ✅ Order successfully place ho gaya!
        </div>
      )}

    </main>
  )
}