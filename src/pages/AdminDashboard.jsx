import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const ADMIN_EMAIL = 'info@loomlink.in'

export default function AdminDashboard() {
  const [manufacturers, setManufacturers] = useState([])
  const [wholesalers, setWholesalers] = useState([])
  const [messages, setMessages] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('manufacturers')
  const [popup, setPopup] = useState({ show: false, message: '', type: '' })

  // Order form state
  const [orderForm, setOrderForm] = useState({
    supplier: '', buyer: '', orderValue: '', marginPercent: '', notes: ''
  })

  const navigate = useNavigate()

  useEffect(() => { checkAdmin() }, [])

  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type })
    setTimeout(() => setPopup({ show: false, message: '', type: '' }), 3000)
  }

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== ADMIN_EMAIL) { navigate('/'); return }
    fetchData()
  }

  const fetchData = async () => {
    const { data: mfgData } = await supabase.from('manufacturers').select('*').order('created_at', { ascending: false })
    const { data: wsData } = await supabase.from('wholesalers').select('*').order('created_at', { ascending: false })
    const { data: msgData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    const { data: enqData } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    const { data: ordData } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setManufacturers(mfgData || [])
    setWholesalers(wsData || [])
    setMessages(msgData || [])
    setEnquiries(enqData || [])
    setOrders(ordData || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleDeleteManufacturer = async (id, name) => {
    if (!window.confirm(`"${name}" ko delete karna chahte hain?`)) return
    const { error } = await supabase.from('manufacturers').delete().eq('id', id)
    if (!error) {
      showPopup(`${name} delete ho gaya!`)
      setManufacturers(prev => prev.filter(m => m.id !== id))
    } else {
      showPopup('Delete failed: ' + error.message, 'error')
    }
  }

  const handleDeleteWholesaler = async (id, name) => {
    if (!window.confirm(`"${name}" ko delete karna chahte hain?`)) return
    const { error } = await supabase.from('wholesalers').delete().eq('id', id)
    if (!error) {
      showPopup(`${name} delete ho gaya!`)
      setWholesalers(prev => prev.filter(w => w.id !== id))
    } else {
      showPopup('Delete failed: ' + error.message, 'error')
    }
  }

  const handleAddOrder = async () => {
    if (!orderForm.supplier || !orderForm.buyer || !orderForm.orderValue || !orderForm.marginPercent) {
      showPopup('Sabhi fields bharein', 'error')
      return
    }
    const orderValue = parseFloat(orderForm.orderValue)
    const marginPercent = parseFloat(orderForm.marginPercent)
    const marginAmount = (orderValue * marginPercent) / 100

    const { error } = await supabase.from('orders').insert({
      supplier: orderForm.supplier,
      buyer: orderForm.buyer,
      order_value: orderValue,
      margin_percent: marginPercent,
      margin_amount: marginAmount,
      notes: orderForm.notes,
      status: 'completed'
    })

    if (!error) {
      showPopup(`Order add ho gaya! Margin: ₹${marginAmount.toFixed(2)} 🎉`)
      setOrderForm({ supplier: '', buyer: '', orderValue: '', marginPercent: '', notes: '' })
      fetchData()
    } else {
      showPopup('Error: ' + error.message, 'error')
    }
  }

  const exportCSV = (data, filename) => {
    if (!data.length) { showPopup('Koi data nahi hai export karne ke liye', 'error'); return }
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).map(v => `"${v || ''}"`).join(','))
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}_${new Date().toLocaleDateString('en-IN').replace(/\//g, '-')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showPopup(`${filename}.csv download ho gaya!`)
  }

  const totalMargin = orders.reduce((sum, o) => sum + (parseFloat(o.margin_amount) || 0), 0)
  const totalOrderValue = orders.reduce((sum, o) => sum + (parseFloat(o.order_value) || 0), 0)

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B' }}>Loading...</div>

  const tabStyle = (tab) => ({
    padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: 600, fontFamily: "'Mukta', sans-serif", fontSize: '0.85rem',
    background: activeTab === tab ? '#1B3A6B' : 'transparent',
    color: activeTab === tab ? 'white' : '#1B3A6B',
    border: '2px solid #1B3A6B', transition: 'all 0.2s', whiteSpace: 'nowrap'
  })

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #ddd', fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
  }

  return (
    <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Popup */}
      {popup.show && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          background: popup.type === 'error' ? '#D32F2F' : '#2D7A4A',
          color: 'white', padding: '14px 24px', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontFamily: "'Mukta', sans-serif",
          fontSize: '0.95rem', maxWidth: '320px'
        }}>
          {popup.message}
        </div>
      )}

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { num: manufacturers.length, label: 'Manufacturers', icon: '🏭', color: '#8B1A1A' },
          { num: wholesalers.length, label: 'Wholesalers', icon: '🛍️', color: '#C9A84C' },
          { num: enquiries.length, label: 'Enquiries', icon: '✉️', color: '#2D5AA0' },
          { num: orders.length, label: 'Orders', icon: '📦', color: '#1B3A6B' },
          { num: `₹${totalMargin.toFixed(0)}`, label: 'Total Margin', icon: '💰', color: '#2D7A4A' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderTop: `4px solid ${stat.color}`, textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: stat.color, fontFamily: "'Playfair Display', serif" }}>{stat.num}</div>
            <div style={{ color: '#888', fontSize: '0.8rem', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button style={tabStyle('manufacturers')} onClick={() => setActiveTab('manufacturers')}>🏭 Manufacturers ({manufacturers.length})</button>
        <button style={tabStyle('wholesalers')} onClick={() => setActiveTab('wholesalers')}>🛍️ Wholesalers ({wholesalers.length})</button>
        <button style={tabStyle('enquiries')} onClick={() => setActiveTab('enquiries')}>✉️ Enquiries ({enquiries.length})</button>
        <button style={tabStyle('orders')} onClick={() => setActiveTab('orders')}>📦 Orders & Margin</button>
        <button style={tabStyle('messages')} onClick={() => setActiveTab('messages')}>💬 Messages ({messages.length})</button>
      </div>

      {/* MANUFACTURERS TAB */}
      {activeTab === 'manufacturers' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button onClick={() => exportCSV(manufacturers, 'manufacturers')} style={{
              background: '#2D7A4A', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Mukta', sans-serif", fontWeight: 600
            }}>📥 Export CSV</button>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#8B1A1A', color: 'white' }}>
                    {['Name', 'Business', 'City', 'WhatsApp', 'MOQ', 'Price Range', 'Registered', 'Action'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {manufacturers.length === 0 ? (
                    <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Koi manufacturer nahi hai</td></tr>
                  ) : manufacturers.map((m, i) => (
                    <tr key={m.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{m.business_name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.city}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>
                        {m.whatsapp && <a href={`https://wa.me/91${m.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}>{m.whatsapp}</a>}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.moq}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{m.price_range}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={() => handleDeleteManufacturer(m.id, m.business_name)} style={{
                          background: '#fff0f0', color: '#D32F2F', border: '1px solid #ffcdd2',
                          padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                          fontSize: '0.8rem', fontFamily: "'Mukta', sans-serif"
                        }}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* WHOLESALERS TAB */}
      {activeTab === 'wholesalers' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button onClick={() => exportCSV(wholesalers, 'wholesalers')} style={{
              background: '#2D7A4A', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Mukta', sans-serif", fontWeight: 600
            }}>📥 Export CSV</button>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#C9A84C', color: '#2D2D2D' }}>
                    {['Name', 'Business', 'City', 'WhatsApp', 'Monthly Req', 'Budget', 'Registered', 'Action'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wholesalers.length === 0 ? (
                    <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Koi wholesaler nahi hai</td></tr>
                  ) : wholesalers.map((w, i) => (
                    <tr key={w.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{w.business_name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.city}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>
                        {w.whatsapp && <a href={`https://wa.me/91${w.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}>{w.whatsapp}</a>}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.monthly_requirement}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{w.budget_range}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(w.created_at).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={() => handleDeleteWholesaler(w.id, w.business_name)} style={{
                          background: '#fff0f0', color: '#D32F2F', border: '1px solid #ffcdd2',
                          padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                          fontSize: '0.8rem', fontFamily: "'Mukta', sans-serif"
                        }}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button onClick={() => exportCSV(enquiries, 'enquiries')} style={{
              background: '#2D7A4A', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
              fontFamily: "'Mukta', sans-serif", fontWeight: 600
            }}>📥 Export CSV</button>
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#2D5AA0', color: 'white' }}>
                    {['Wholesaler', 'Business', 'City', 'Message', 'Manufacturer ID', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Abhi koi enquiry nahi aayi</td></tr>
                  ) : enquiries.map((enq, i) => (
                    <tr key={enq.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{enq.wholesaler_name}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{enq.wholesaler_business || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{enq.wholesaler_city || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', maxWidth: '250px' }}>{enq.message}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#888' }}>{enq.manufacturer_id?.slice(0, 8)}...</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: enq.status === 'pending' ? '#fff8e1' : '#e8f5e9',
                          color: enq.status === 'pending' ? '#F57F17' : '#2D7A4A',
                          padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600
                        }}>{enq.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(enq.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS & MARGIN TAB */}
      {activeTab === 'orders' && (
        <div style={{ display: 'grid', gap: '24px' }}>

          {/* Add Order Form */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px', fontSize: '1.3rem' }}>
              📦 Naya Order Add Karo
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {[
                { label: 'Supplier (Manufacturer)', key: 'supplier', placeholder: 'Jaise: Sandip Sarees, Banaras' },
                { label: 'Buyer (Wholesaler)', key: 'buyer', placeholder: 'Jaise: Sharma Traders, Lucknow' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>{f.label}</label>
                  <input value={orderForm[f.key]} onChange={e => setOrderForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>Order Value (₹)</label>
                <input type="number" value={orderForm.orderValue} onChange={e => setOrderForm(p => ({ ...p, orderValue: e.target.value }))} placeholder="Jaise: 50000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>Aapka Margin %</label>
                <input type="number" value={orderForm.marginPercent} onChange={e => setOrderForm(p => ({ ...p, marginPercent: e.target.value }))} placeholder="Jaise: 2" style={inputStyle} />
              </div>
            </div>

            {/* Live Margin Calculator */}
            {orderForm.orderValue && orderForm.marginPercent && (
              <div style={{
                background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                border: '2px solid #2D7A4A', borderRadius: '12px',
                padding: '20px', marginBottom: '16px',
                display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Mukta', sans-serif" }}>Order Value</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1B3A6B', fontFamily: "'Playfair Display', serif" }}>₹{parseFloat(orderForm.orderValue).toLocaleString('en-IN')}</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: '#888' }}>×</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Mukta', sans-serif" }}>Margin %</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E8821A', fontFamily: "'Playfair Display', serif" }}>{orderForm.marginPercent}%</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: '#888' }}>=</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Mukta', sans-serif" }}>Aapki Earning</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2D7A4A', fontFamily: "'Playfair Display', serif" }}>
                    ₹{((parseFloat(orderForm.orderValue) * parseFloat(orderForm.marginPercent)) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>Notes (Optional)</label>
              <input value={orderForm.notes} onChange={e => setOrderForm(p => ({ ...p, notes: e.target.value }))} placeholder="Koi extra notes..." style={inputStyle} />
            </div>

            <button onClick={handleAddOrder} style={{
              background: 'linear-gradient(135deg, #1B3A6B, #2D5AA0)',
              color: 'white', border: 'none', padding: '12px 32px',
              borderRadius: '10px', cursor: 'pointer', fontWeight: 700,
              fontSize: '1rem', fontFamily: "'Mukta', sans-serif"
            }}>
              📦 Order Save Karo
            </button>
          </div>

          {/* Orders Table */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', margin: 0 }}>
                📊 Transaction Records
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ background: '#f0faf4', border: '1px solid #2D7A4A', borderRadius: '8px', padding: '8px 16px', fontSize: '0.9rem', color: '#2D7A4A', fontWeight: 600 }}>
                  Total Margin: ₹{totalMargin.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ background: '#f0f4fa', border: '1px solid #1B3A6B', borderRadius: '8px', padding: '8px 16px', fontSize: '0.9rem', color: '#1B3A6B', fontWeight: 600 }}>
                  Total Orders: ₹{totalOrderValue.toLocaleString('en-IN')}
                </div>
                <button onClick={() => exportCSV(orders, 'orders')} style={{
                  background: '#2D7A4A', color: 'white', border: 'none',
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: "'Mukta', sans-serif", fontWeight: 600, fontSize: '0.85rem'
                }}>📥 Export CSV</button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1B3A6B', color: 'white' }}>
                    {['Supplier', 'Buyer', 'Order Value', 'Margin %', 'Aapki Earning', 'Notes', 'Date'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Abhi koi order nahi hai — upar se add karo!</td></tr>
                  ) : orders.map((o, i) => (
                    <tr key={o.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: 600 }}>{o.supplier}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{o.buyer}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#1B3A6B', fontWeight: 600 }}>₹{parseFloat(o.order_value).toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem' }}>{o.margin_percent}%</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#2D7A4A', fontWeight: 700 }}>₹{parseFloat(o.margin_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888' }}>{o.notes || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap' }}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
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